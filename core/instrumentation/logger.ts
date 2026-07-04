// Project: FingerprintGuard
// Module: Core/Instrumentation/Logger
// Purpose: Small logging utility with console.debug and console.error helpers.

/**
 * Shared log prefix constant for FingerprintGuard console messages.
 */
export const LOG_PREFIX = "[FingerprintGuard]";

/**
 * Logs a message at the debug level to console.debug.
 *
 * @param message The main message to log.
 * @param args Additional arguments or context objects.
 */
export function debug(message: string, ...args: unknown[]): void {
  console.debug(`${LOG_PREFIX} ${message}`, ...args);
}

/**
 * Logs a message at the error level to console.error.
 *
 * @param message The main error message to log.
 * @param args Additional error context or exception details.
 */
export function error(message: string, ...args: unknown[]): void {
  console.error(`${LOG_PREFIX} ${message}`, ...args);
}
