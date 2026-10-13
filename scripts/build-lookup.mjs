import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import CleanCSS from 'clean-css';
import { minify } from 'html-minifier-terser';

export const LOOKUP_LIMIT = 4000;
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Level 0 only removes formatting; no selector/value optimization or URL rebasing.
function compactCss(css, type) {
  // The HTML minifier supplies declarations and media queries as fragments.
  const input = type === 'inline' ? `*{${css}}`
    : type === 'media' ? `@media ${css}{a{top:0}}` : css;
  const result = new CleanCSS({ level: 0, rebase: false, inline: false }).minify(input);
  if (result.errors.length || result.warnings.length) {
    throw new Error(`CSS needs review: ${[...result.errors, ...result.warnings].join('; ')}`);
  }
  if (type === 'inline') return result.styles.slice(2, -1);
  if (type === 'media') return result.styles.match(/^@media ([\s\S]*?)\s*\{/)[1];
  return result.styles;
}

export async function compactLookup(html, css = '') {
  // CSS is a sibling source file or existing style blocks, never an external link.
  if (/<\/style\s*>/i.test(css)) throw new Error('CSS cannot contain a closing style tag.');
  const submission = css ? `<style>${compactCss(css)}</style>\n${html}` : html;
  return minify(submission, {
    removeComments: true,
    collapseWhitespace: false,
    removeAttributeQuotes: false,
    removeOptionalTags: false,
    minifyJS: false,
    minifyCSS: compactCss,
    continueOnParseError: false,
  });
}

export function countSubmission(submission) {
  return {
    codePoints: [...submission].length,
    utf16Units: submission.length,
    utf8Bytes: Buffer.byteLength(submission, 'utf8'),
    limit: LOOKUP_LIMIT,
    // The site's Unicode counting is unverified; UTF-16 is the stricter character count.
    remaining: LOOKUP_LIMIT - submission.length,
  };
}

export async function buildLookup(pet, version, { root = projectRoot, check = false } = {}) {
  for (const value of [pet, version]) {
    if (typeof value !== 'string' || !/^[a-z0-9][a-z0-9._-]*$/i.test(value)) {
      throw new Error('Pet and version must be names using letters, numbers, dots, underscores, or hyphens.');
    }
  }
  const source = join(root, 'lookups', 'src', pet, version);
  const output = join(root, 'lookups', 'builds', pet, version);
  const html = await readFile(`${source}.html`, 'utf8');
  let css = '';
  try {
    css = await readFile(`${source}.css`, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const submission = await compactLookup(html, css);
  if (!submission.trim()) throw new Error('Lookup submission is empty.');
  const counts = countSubmission(submission);
  if (counts.remaining < 0) {
    throw new Error(`Lookup exceeds ${LOOKUP_LIMIT}: ${counts.utf16Units} UTF-16 units (${counts.codePoints} code points). No build files changed.`);
  }
  const report = `${JSON.stringify({
    sourceHtml: `lookups/src/${pet}/${version}.html`,
    sourceCss: css ? `lookups/src/${pet}/${version}.css` : null,
    submission: `lookups/builds/${pet}/${version}.compact.html`,
    ...counts,
  }, null, 2)}\n`;
  if (check) {
    if (await readFile(`${output}.compact.html`, 'utf8') !== submission ||
        await readFile(`${output}.counts.json`, 'utf8') !== report) {
      throw new Error('Generated files are stale. Run the build and review the changes.');
    }
  } else {
    await mkdir(dirname(output), { recursive: true });
    // No trailing newline: the count covers exactly what is written to the submission file.
    await writeFile(`${output}.compact.html`, submission, 'utf8');
    await writeFile(`${output}.counts.json`, report, 'utf8');
  }
  return counts;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const [pet, version, flag, ...extra] = process.argv.slice(2);
    if (!pet || !version || (flag && flag !== '--check') || extra.length) {
      throw new Error('Usage: npm run build:lookup -- <pet> <version> [--check]');
    }
    const counts = await buildLookup(pet, version, { check: flag === '--check' });
    console.log(`${flag ? 'Checked' : 'Built'} ${pet}/${version}: ${counts.utf16Units}/${counts.limit} UTF-16 units; ${counts.codePoints} code points; ${counts.utf8Bytes} UTF-8 bytes; ${counts.remaining} units remaining.`);
    console.log('Local build only. Review output and test on Neopets with Tori\'s approval.');
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exitCode = 1;
  }
}
