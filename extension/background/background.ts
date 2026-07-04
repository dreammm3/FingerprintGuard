// Project: FingerprintGuard
// Module: Background Service Worker
// Purpose: Receives validated messages from the Content Script.
//
// Responsibilities:
// - Receive extension messages.
// - Validate message schema.
// - Log valid messages.
//
// Must NOT:
// - Store data.
// - Compute observations.
// - Compute behavioral indicators.
// - Perform ML inference.
// - Modify browser state.

import { isValidFingerprintGuardMessage } from "../shared/message";

const LOG_PREFIX = "[FingerprintGuard]";

/**
 * Handles incoming extension messages.
 * Only messages matching the FingerprintGuardMessage schema are accepted.
 */
function handleMessage(message: unknown): void {
  if (!isValidFingerprintGuardMessage(message)) {
    return;
  }

  console.debug(LOG_PREFIX, "Received valid message:", message);
}

/**
 * Registers the background message listener.
 */
function initializeBackgroundServiceWorker(): void {
  chrome.runtime.onMessage.addListener((message: unknown) => {
    handleMessage(message);
  });
}

// Initialize the background service worker.
initializeBackgroundServiceWorker();