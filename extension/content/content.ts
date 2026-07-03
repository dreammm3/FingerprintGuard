// Project: FingerprintGuard
// Module: Content Script
// Purpose: Injects the page-context script and forwards validated messages
// to the Background Service Worker.

import {
  FingerprintGuardMessage,
  isValidFingerprintGuardMessage,
} from "../shared/message";

const LOG_PREFIX = "[FingerprintGuard]";

function injectScript(): void {
  const script = document.createElement("script");

  script.src = chrome.runtime.getURL("injected/injected.js");

  script.onload = () => {
    script.remove();
  };

  script.onerror = () => {
    console.error(LOG_PREFIX, "Failed to load injected script.");
    script.remove();
  };

  (document.head ?? document.documentElement).appendChild(script);
}

function handleWindowMessage(event: MessageEvent): void {
  if (event.source !== window) {
    return;
  }

  if (event.origin !== window.location.origin) {
    return;
  }

  const data: unknown = event.data;

  if (!isValidFingerprintGuardMessage(data)) {
    return;
  }

  chrome.runtime
    .sendMessage(data as FingerprintGuardMessage)
    .catch((error) => {
      console.error(LOG_PREFIX, "Failed to forward message.", error);
    });
}

function initializeMessageListener(): void {
  window.addEventListener("message", handleWindowMessage);
}

injectScript();
initializeMessageListener();