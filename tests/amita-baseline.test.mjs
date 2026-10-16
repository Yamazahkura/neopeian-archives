import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildLookup } from '../scripts/build-lookup.mjs';

test('confirmed Amita V02.1 retains the exact uploaded bytes', async () => {
  const reference = await readFile(new URL('../lookups/confirmed/amita/v02.1/Amita_Lookup_Test_v02.1_vertical_compact.html', import.meta.url));
  assert.equal(createHash('sha256').update(reference).digest('hex'),
    'aa55526f1b25cdcdf9a561911198c0acc842302c23e94f2bd2fbc7aa76cc7843');
});

test('Amita import build and count report reproduce from committed source', async () => {
  await buildLookup('amita', 'v02.1-import', { check: true });
});
