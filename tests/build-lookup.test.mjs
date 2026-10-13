import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildLookup, compactLookup, countSubmission } from '../scripts/build-lookup.mjs';

async function fixture(t, html, css) {
  const root = await mkdtemp(join(tmpdir(), 'neopian-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, 'lookups/src/test');
  await mkdir(source, { recursive: true });
  await writeFile(join(source, 'v01.html'), html);
  if (css !== undefined) await writeFile(join(source, 'v01.css'), css);
  return { root, source, output: join(root, 'lookups/builds/test/v01') };
}

test('compaction preserves inline spacing, quoted attributes, preformatted text, and CSS semantics', async () => {
  const html = '<!-- author note --><p><a href="https://example.com/?a=1&amp;b=2">first</a> <em>second</em></p><pre>  two\n lines </pre>';
  const css = '/* section */ .archive > p { width: calc(100% - 2px); background-image: url("https://example.com/art.png"); } .archive p { content: "a  b"; }';
  const output = await compactLookup(html, css);
  assert.ok(output.includes('</a> <em>'));
  assert.ok(output.includes('<pre>  two\n lines </pre>'));
  assert.ok(output.includes('href="https://example.com/?a=1&amp;b=2"'));
  assert.ok(output.includes('calc(100% - 2px)'));
  assert.ok(output.includes('https://example.com/art.png'));
  assert.ok(output.includes('"a  b"'));
  assert.ok(!output.includes('author note'));
  assert.ok(output.includes('/* section */')); // Level 0 retains CSS comments.
  assert.ok(output.length < html.length + css.length + '<style></style>\n'.length);
});

test('embedded CSS and inline style declarations are compacted safely', async () => {
  const output = await compactLookup('<style>.archive { color: green; }</style><p style="color: green; padding: 2px;">text</p>');
  assert.ok(output.includes('.archive{color:green}'));
  assert.ok(output.includes('style="color:green;padding:2px"'));
});

test('media queries and imports remain intact without fetching or rebasing URLs', async () => {
  const html = '<style media="screen and (max-width: 600px)">.archive { color: green; }</style>';
  const output = await compactLookup(html, '@import url("missing-local.css"); .archive { background: url(../art.png); }');
  assert.ok(output.includes('media="screen and (max-width: 600px)"'));
  assert.ok(output.includes('missing-local.css'));
  assert.ok(output.includes('../art.png'));
});

test('exact 4000-character boundary passes and a larger build cannot replace it', async (t) => {
  const { root, source, output } = await fixture(t, 'x'.repeat(4000));
  const counts = await buildLookup('test', 'v01', { root });
  assert.equal(counts.remaining, 0);
  const original = await readFile(`${output}.compact.html`, 'utf8');
  const report = await readFile(`${output}.counts.json`, 'utf8');
  assert.equal(original.length, 4000);
  assert.equal(JSON.parse(report).utf16Units, original.length);
  assert.equal(await readFile(join(source, 'v01.html'), 'utf8'), original);
  await writeFile(join(source, 'v01.html'), 'x'.repeat(4001));
  await assert.rejects(buildLookup('test', 'v01', { root }), /exceeds 4000/);
  assert.equal(await readFile(`${output}.compact.html`, 'utf8'), original);
  assert.equal(await readFile(`${output}.counts.json`, 'utf8'), report);
});

test('style wrapper and all HTML count toward the submission limit', async (t) => {
  const { root, output } = await fixture(t, 'x'.repeat(3980), '.archive { color: green; }');
  await assert.rejects(buildLookup('test', 'v01', { root }), /exceeds 4000/);
  await assert.rejects(readFile(`${output}.compact.html`), { code: 'ENOENT' });
});

test('Unicode count units are explicit and UTF-16 limit is enforced', async (t) => {
  assert.deepEqual(countSubmission('é🐾'), {
    codePoints: 2, utf16Units: 3, utf8Bytes: 6, limit: 4000, remaining: 3997,
  });
  const { root } = await fixture(t, '🐾'.repeat(2001));
  await assert.rejects(buildLookup('test', 'v01', { root }), /4002 UTF-16 units/);
});

test('check mode detects missing or stale output without rewriting files', async (t) => {
  const { root, source, output } = await fixture(t, '<p>old</p>');
  await assert.rejects(buildLookup('test', 'v01', { root, check: true }), { code: 'ENOENT' });
  await buildLookup('test', 'v01', { root });
  await buildLookup('test', 'v01', { root, check: true });
  await writeFile(join(source, 'v01.html'), '<p>new</p>');
  await assert.rejects(buildLookup('test', 'v01', { root, check: true }), /stale/);
  assert.equal(await readFile(`${output}.compact.html`, 'utf8'), '<p>old</p>');
});

test('missing source, unsafe names, empty output, and malformed CSS fail clearly', async (t) => {
  const { root } = await fixture(t, '<!-- empty -->');
  await assert.rejects(buildLookup('test', 'missing', { root }), { code: 'ENOENT' });
  await assert.rejects(buildLookup('../confirmed', 'v01', { root }), /must be names/);
  await assert.rejects(buildLookup('test', 'v01', { root }), /empty/);
  await assert.rejects(compactLookup('<p>text</p>', '.archive{color:green} invalid'), /CSS needs review/);
  await assert.rejects(compactLookup('<p>text</p>', '</style><p>injection</p>'), /closing style tag/);
});

