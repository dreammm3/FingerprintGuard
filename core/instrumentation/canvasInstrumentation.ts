// Project: FingerprintGuard
// Module: Core/Instrumentation/CanvasInstrumentation
// Purpose: Instruments Canvas read APIs to observe behavioral tracking.

import { APICategory, CallType } from "./instrumentationEvent";
import { publish } from "./observationPublisher";

/**
 * Tracks if the canvas instrumentation has already been initialized.
 */
let isInitialized = false;

/**
 * Initializes the instrumentation of Canvas APIs.
 * This method is idempotent and will return immediately if already initialized.
 */
export function initializeCanvasInstrumentation(): void {
  if (isInitialized) {
    return;
  }

  // Ensure DOM and the required constructors are available in the current execution context
  if (
    typeof window === "undefined" ||
    typeof HTMLCanvasElement === "undefined" ||
    typeof CanvasRenderingContext2D === "undefined"
  ) {
    return;
  }

  // Instrument HTMLCanvasElement.prototype.toDataURL
  const toDataURLDesc = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "toDataURL");
  if (toDataURLDesc && typeof toDataURLDesc.value === "function") {
    const originalToDataURL = toDataURLDesc.value as (type?: string, quality?: unknown) => string;

    const wrappedToDataURL = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof originalToDataURL>
    ): ReturnType<typeof originalToDataURL> {
      const timestamp = performance.now();

      try {
        publish({
          timestamp,
          apiName: "HTMLCanvasElement.prototype.toDataURL",
          apiCategory: APICategory.Canvas,
          callType: CallType.Read,
        });
      } catch (error) {
        console.error(
          "[FingerprintGuard]",
          "Failed to publish instrumentation event.",
          error
        );
      }

      return originalToDataURL.apply(this, args);
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
      ...toDataURLDesc,
      value: wrappedToDataURL,
    });
  }

  // Instrument CanvasRenderingContext2D.prototype.getImageData
  const getImageDataDesc = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, "getImageData");
  if (getImageDataDesc && typeof getImageDataDesc.value === "function") {
    const originalGetImageData = getImageDataDesc.value as (
      sx: number,
      sy: number,
      sw: number,
      sh: number,
      settings?: unknown
    ) => ImageData;

    const wrappedGetImageData = function (
      this: CanvasRenderingContext2D,
      ...args: Parameters<typeof originalGetImageData>
    ): ReturnType<typeof originalGetImageData> {
      const timestamp = performance.now();

      try {
        publish({
          timestamp,
          apiName: "CanvasRenderingContext2D.prototype.getImageData",
          apiCategory: APICategory.Canvas,
          callType: CallType.Read,
        });
      } catch (error) {
        console.error(
          "[FingerprintGuard]",
          "Failed to publish instrumentation event.",
          error
        );
      }

      return originalGetImageData.apply(this, args);
    };

    Object.defineProperty(CanvasRenderingContext2D.prototype, "getImageData", {
      ...getImageDataDesc,
      value: wrappedGetImageData,
    });
  }

  isInitialized = true;
}
