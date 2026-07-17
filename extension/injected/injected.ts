// Project: FingerprintGuard
// Module: Injected Script
// Purpose: Executes inside the webpage context and sends a bootstrap message.

import { initializeCanvasInstrumentation } from "../../core/instrumentation/canvasInstrumentation";
import { initializeWebGLInstrumentation } from "../../core/instrumentation/webglInstrumentation";
import { initializeAudioInstrumentation } from "../../core/instrumentation/audioInstrumentation";

function sendTestMessage(): void {
  const message = {
    type: "TEST_BOOTSTRAP",
    source: "injected-script",
    timestamp: Date.now(),
    payload: {
      message: "FingerprintGuard bootstrap successful."
    }
  };

  window.postMessage(message, "*");
}

function initializeInjectedScript(): void {
  initializeCanvasInstrumentation();
  initializeWebGLInstrumentation();
  initializeAudioInstrumentation();
  sendTestMessage();
}

initializeInjectedScript();