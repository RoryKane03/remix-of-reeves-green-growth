import { describe, it, expect } from 'bun:test';
import { notifyQuote } from './notifyQuote';

const opts = { delayMs: 0 };

describe('notifyQuote', () => {
  it('treats an error response as a failure and retries until success', async () => {
    let n = 0;
    const r = await notifyQuote(async () => (++n < 2 ? { data: null, error: new Error('500') } : { data: { success: true }, error: null }), {}, opts);
    expect(r).toMatchObject({ sent: true, attempts: 2 });
  });

  it('falls back to sending without photos after 3 failed attempts', async () => {
    const bodies: any[] = [];
    const r = await notifyQuote(async (b) => {
      bodies.push(b);
      return (b.files as unknown[]).length ? { data: null, error: 'too big' } : { data: { success: true }, error: null };
    }, { files: [{}] }, opts);
    expect(r).toMatchObject({ sent: true, attempts: 4, withoutPhotos: true });
  });

  it('reports failure without throwing when every attempt fails', async () => {
    const r = await notifyQuote(async () => { throw new Error('offline'); }, {}, opts);
    expect(r).toMatchObject({ sent: false, attempts: 3, error: 'offline' });
  });
});
