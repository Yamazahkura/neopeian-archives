import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildLookup } from '../scripts/build-lookup.mjs';

const source = new URL('../lookups/src/amita/v02.2.html', import.meta.url);
const baseline = new URL('../lookups/src/amita/v02.1-import.html', import.meta.url);

function rules(html) {
  const css = html.match(/<style>([\s\S]*?)<\/style>/)[1].replace(/\/\*[\s\S]*?\*\//g, '');
  return new Map([...css.matchAll(/([^{}]+)\{([^{}]+)\}/g)].map(([, selector, body]) => [
    selector.trim(), body.replace(/\s/g, '').replace(/;$/, ''),
  ]));
}
function markup(html) {
  return html.split('</style>')[1].replace(/>\s+</g, '><').trim();
}

test('V02.2 preserves every baseline rule and resident element except the documented additions', async () => {
  const old = await readFile(baseline, 'utf8');
  const next = await readFile(source, 'utf8');
  const nextRules = rules(next);
  nextRules.set('.sd .ab', nextRules.get('.sd .ab')
    .replace(';box-sizing:border-box;height:320px;overflow:auto', ''));
  assert.equal(nextRules.get('.sd .sn'), 'font-size:11px;text-align:right;margin:6px00');
  nextRules.delete('.sd .sn');
  assert.deepEqual(nextRules, rules(old));
  assert.equal(markup(next).replace(' tabindex="0"', '')
    .replace('<div class="sn">Scroll to read more</div>', ''), markup(old));
  assert.doesNotMatch(next, /box-shadow|mix-blend-mode|border-radius|overflow-y|background-image/);
});

test('V02.2 committed compact build and count report reproduce within the lookup limit', async () => {
  const counts = await buildLookup('amita', 'v02.2', { check: true });
  assert.ok(counts.remaining > 0);
});
