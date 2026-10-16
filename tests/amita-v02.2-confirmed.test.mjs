import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const archived = new URL('../lookups/confirmed/amita/v02.2/', import.meta.url);

test('confirmed V02.2 retains exact corrected build bytes and provenance', async () => {
  const reference = await readFile(new URL('v02.2.compact.html', archived));
  const metadata = JSON.parse(await readFile(new URL('metadata.json', archived), 'utf8'));
  const sha = createHash('sha256').update(reference).digest('hex');
  assert.equal(sha, '977f448de9fd1ee8459114d2194482de4a22be43b5bc953f2613c6d938e20a1e');
  assert.equal(metadata.sha256, sha);
  assert.equal(metadata.utf8Bytes, reference.length);
  assert.equal(reference.length, 3667);
  assert.deepEqual(reference, await readFile(new URL('../lookups/builds/amita/v02.2.compact.html', import.meta.url)));
  assert.doesNotMatch(reference.toString(), /tabindex|box-sizing/);
});
