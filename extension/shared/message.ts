// Project: FingerprintGuard
// Module: Shared Message Types and Validation
// Purpose: Defines the FingerprintGuardMessage interface and validation utilities.

/**
 * Canonical message format used throughout the FingerprintGuard extension.
 */
export interface FingerprintGuardMessage {
  type: string;
  source: string;
  timestamp: number;
  payload: unknown;
}

/**
 * Allowed properties for FingerprintGuard messages.
 * Messages containing additional properties are rejected.
 */
const ALLOWED_MESSAGE_KEYS = new Set([
  "type",
  "source",
  "timestamp",
  "payload",
]);

/**
 * Validates whether an unknown value conforms exactly to the
 * FingerprintGuardMessage schema.
 *
 * This function never throws.
 */
export function isValidFingerprintGuardMessage(
  data: unknown
): data is FingerprintGuardMessage {
  try {
    if (data === null || typeof data !== "object") {
      return false;
    }

    const candidate = data as Record<string, unknown>;

    // Reject unexpected properties.
    for (const key of Object.keys(candidate)) {
      if (!ALLOWED_MESSAGE_KEYS.has(key)) {
        return false;
      }
    }

    // Ensure all required properties exist.
    if (!("type" in candidate)) return false;
    if (!("source" in candidate)) return false;
    if (!("timestamp" in candidate)) return false;
    if (!("payload" in candidate)) return false;

    // Validate property types.
    if (
      typeof candidate.type !== "string" ||
      candidate.type.trim().length === 0
    ) {
      return false;
    }

    if (
      typeof candidate.source !== "string" ||
      candidate.source.trim().length === 0
    ) {
      return false;
    }

    if (
      typeof candidate.timestamp !== "number" ||
      !Number.isFinite(candidate.timestamp)
    ) {
      return false;
    }

    // Payload may be any value, including null.

    return true;
  } catch {
    return false;
  }
}