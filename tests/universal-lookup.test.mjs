import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { buildLookup } from '../scripts/build-lookup.mjs';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const cssRules = html => new Map([...html.match(/<style>([\s\S]*?)<\/style>/)[1]
  .replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^{}]+)\}/g)]
  .map(([, selector, body]) => [selector.trim(), body.replace(/\s/g, '').replace(/;$/, '')]));
const markup = html => html.split('</style>')[1].replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').trim();

test('Amita V02.3 changes only the documented background placement, footer fill and credit', async () => {
  const baseline = await read('lookups/confirmed/amita/v02.2/v02.2.compact.html');
  const next = await read('lookups/src/amita/v02.3.html');
  const rules = cssRules(next);
  rules.set('.sd', rules.get('.sd').replace(';background-image:url(https://i.imgur.com/DhlJ1Pi.png);background-position:centertop;background-repeat:no-repeat', ''));
  assert.equal(rules.get('.sd .sn,.sd .aft'), 'background:#202923');
  rules.delete('.sd .sn,.sd .aft');
  assert.equal(rules.get('.sd .aft a'), 'color:#e6ddc8');
  rules.delete('.sd .aft a');
  assert.deepEqual(rules, cssRules(baseline));
  assert.equal(markup(next).replace('<br>Background: <a href="/userlookup.phtml?user=mexxyyy">Whitespace</a>', ''), markup(baseline));
});

test('Universal V1.0 shares V02.3 structure and CSS while keeping character content editable', async () => {
  const draft = await read('lookups/src/amita/v02.3.html');
  const template = await read('lookups/src/universal/v1.0.html');
  // Template changes are outside this targeted Amita fix; record its one known divergence.
  assert.ok(template.includes('background-size:cover'));
  assert.deepEqual(cssRules(template.replace('  background-size:cover;\n', '')), cssRules(draft));
  const shape = html => markup(html).replace(/>[^<]*</g, '><');
  assert.equal(shape(template), shape(draft));
  assert.ok(template.includes('PET NAME'));
  assert.ok(template.includes('CHARACTER:'));
  assert.doesNotMatch(template, /AMITA|Swamp Witch|Mutant Cybunny|Self-appointed Witch/);
});

test('draft builds reproduce within the limit; corrected Amita excludes background-size', async () => {
  for (const [pet, version] of [['amita', 'v02.3'], ['universal', 'v1.0']]) {
    const counts = await buildLookup(pet, version, { check: true });
    assert.ok(counts.remaining > 0);
    const output = await read(`lookups/builds/${pet}/${version}.compact.html`);
    assert.doesNotMatch(output, /tabindex|box-sizing|box-shadow|mix-blend-mode|border-radius/);
    if (pet === 'amita') assert.doesNotMatch(output, /background-size/);
    assert.match(output, /height:278px;overflow:auto/);
    assert.ok(output.includes('Background: <a href="/userlookup.phtml?user=mexxyyy">Whitespace</a>'));
  }
});
