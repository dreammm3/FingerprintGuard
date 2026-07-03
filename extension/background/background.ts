// Project: FingerprintGuard
// Module: Background Service Worker
// Purpose: Listens to extension messages, validates their structure, and logs valid messages to debug console.

import { isValidFingerprintGuardMessage } from '../shared/message';

/**
 * Listens for messages dispatched from content scripts, validates them,
 * and logs valid FingerprintGuardMessage payloads.
 */
function setupBackgroundListener(): void {
  chrome.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
    try {
      if (isValidFingerprintGuardMessage(message)) {
        console.debug('FingerprintGuard: Received valid message:', message);
      }
      // Silently ignore invalid messages without throwing errors
    } catch (error) {
      // Catch any unexpected runtime errors to avoid throwing unhandled exceptions
      console.error('FingerprintGuard: Unexpected error in background listener:', error);
    }
    
    // Return true or false as appropriate. Since we don't send responses yet, we do not return true.
  });
}

// Initialize listener setup
setupBackgroundListener();
