// Project: FingerprintGuard
// Module: Shared Message Types and Validation
// Purpose: Defines FingerprintGuardMessage interface and the message validation predicate function.

export interface FingerprintGuardMessage {
  type: string;
  source: string;
  timestamp: number;
  payload: unknown;
}

/**
 * Validates whether the given unknown data structure matches the FingerprintGuardMessage schema.
 * Must NOT throw under any input.
 */
export function isValidFingerprintGuardMessage(data: unknown): data is FingerprintGuardMessage {
  try {
    if (data === null || typeof data !== 'object') {
      return false;
    }

    const candidate = data as Record<string, unknown>;

    if (typeof candidate.type !== 'string' || candidate.type.trim() === '') {
      return false;
    }

    if (typeof candidate.source !== 'string' || candidate.source.trim() === '') {
      return false;
    }

    if (typeof candidate.timestamp !== 'number' || !Number.isFinite(candidate.timestamp)) {
      return false;
    }

    if (!('payload' in candidate)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
