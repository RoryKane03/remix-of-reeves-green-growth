export type NotifyInvoke = (body: Record<string, unknown>) => Promise<{ data: unknown; error: unknown }>;

export type NotifyResult = { sent: boolean; attempts: number; withoutPhotos: boolean; error?: string };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function failed(res: { data: unknown; error: unknown }) {
  if (res.error) return true;
  const d = res.data as { success?: boolean } | null;
  return !d || d.success !== true;
}

/**
 * Sends the business notification for a saved quote. Retries transient failures,
 * then makes a final attempt without photo attachments so the enquiry still arrives.
 * Never throws: the quote is already saved.
 */
export async function notifyQuote(
  invoke: NotifyInvoke,
  body: Record<string, unknown> & { files?: unknown[] },
  { attempts = 3, delayMs = 1500 }: { attempts?: number; delayMs?: number } = {},
): Promise<NotifyResult> {
  let lastError = 'unknown';
  let tries = 0;
  const hasFiles = Array.isArray(body.files) && body.files.length > 0;
  const plan = hasFiles ? [...Array(attempts).fill(false), true] : Array(attempts).fill(false);

  for (const withoutPhotos of plan) {
    if (tries > 0) await wait(delayMs * tries);
    tries++;
    try {
      const res = await invoke(withoutPhotos ? { ...body, files: [] } : body);
      if (!failed(res)) return { sent: true, attempts: tries, withoutPhotos };
      lastError = res.error instanceof Error ? res.error.message : String(res.error ?? 'unsuccessful response');
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
    }
  }
  return { sent: false, attempts: tries, withoutPhotos: false, error: lastError };
}
