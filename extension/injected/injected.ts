// Project: FingerprintGuard
// Module: Injected Script
// Purpose: Executes inside the webpage context and sends a bootstrap message.

function sendTestMessage(): void {
  const message = {
    type: "TEST_BOOTSTRAP",
    source: "injected-script",
    timestamp: Date.now(),
    payload: {
      message: "FingerprintGuard bootstrap successful."
    }
  };

  window.postMessage(message, window.location.origin);
}

function initializeInjectedScript(): void {
  sendTestMessage();
}

initializeInjectedScript();