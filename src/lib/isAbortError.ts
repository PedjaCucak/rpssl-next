export const isAbortError = (err: unknown): boolean => {
  if (!err) return false;

  // DOMException: AbortError (fetch/AbortController)
  if (
    typeof err === 'object' &&
    'name' in err &&
    (err as any).name === 'AbortError'
  ) {
    return true;
  }

  // Axios v1: CanceledError
  if (
    typeof err === 'object' &&
    'code' in err &&
    (err as any).code === 'ERR_CANCELED'
  ) {
    return true;
  }

  // Fallbacks: common messages
  if (typeof err === 'object' && 'message' in err) {
    const msg = String((err as any).message).toLowerCase();
    if (msg === 'aborted' || msg === 'canceled' || msg.includes('abort'))
      return true;
  }

  return false;
};
