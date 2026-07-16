// Project: FingerprintGuard
// Module: Core/Instrumentation/WebGLInstrumentation
// Purpose: Instruments WebGL getParameter APIs to observe behavioral tracking.

import { APICategory, CallType } from "./instrumentationEvent";
import { publish } from "./observationPublisher";
import { error as logError } from "./logger";

/**
 * Symbol used to mark already-instrumented prototypes.
 */
const WRAPPED_SYMBOL = Symbol("FingerprintGuard.WebGL");

/**
 * Type contract for the getParameter API function with custom wrapper tracking.
 */
type GetParameterFn = ((pname: number) => unknown) & {
  [WRAPPED_SYMBOL]?: boolean;
};

/**
 * Initializes the instrumentation of WebGL APIs.
 * This method checks each prototype individually for idempotency using the wrapper symbol.
 */
export function initializeWebGLInstrumentation(): void {
  // Ensure DOM is available in the current execution context
  if (typeof window === "undefined") {
    return;
  }

  // WebGL1 Instrumentation
  if (typeof WebGLRenderingContext !== "undefined") {
    try {
      const desc = Object.getOwnPropertyDescriptor(WebGLRenderingContext.prototype, "getParameter");
      if (desc && typeof desc.value === "function") {
        const original = desc.value as GetParameterFn;
        if (!original[WRAPPED_SYMBOL]) {
          const wrappedGetParameter: GetParameterFn = function (
            this: WebGLRenderingContext,
            ...args: Parameters<GetParameterFn>
          ): ReturnType<GetParameterFn> {
            const timestamp = performance.now();

            try {
              publish({
                timestamp,
                apiName: "WebGLRenderingContext.prototype.getParameter",
                apiCategory: APICategory.WebGL,
                callType: CallType.Read,
              });
            } catch (err) {
              logError("Failed to publish WebGLRenderingContext instrumentation event.", err);
            }

            return original.apply(this, args);
          };

          // Mark wrapper as wrapped
          wrappedGetParameter[WRAPPED_SYMBOL] = true;

          Object.defineProperty(WebGLRenderingContext.prototype, "getParameter", {
            ...desc,
            value: wrappedGetParameter,
          });
        }
      }
    } catch (err) {
      logError("Failed to wrap WebGLRenderingContext.prototype.getParameter.", err);
    }
  }

  // WebGL2 Instrumentation
  if (typeof WebGL2RenderingContext !== "undefined") {
    try {
      const desc = Object.getOwnPropertyDescriptor(WebGL2RenderingContext.prototype, "getParameter");
      if (desc && typeof desc.value === "function") {
        const original = desc.value as GetParameterFn;
        if (!original[WRAPPED_SYMBOL]) {
          const wrappedGetParameter: GetParameterFn = function (
            this: WebGL2RenderingContext,
            ...args: Parameters<GetParameterFn>
          ): ReturnType<GetParameterFn> {
            const timestamp = performance.now();

            try {
              publish({
                timestamp,
                apiName: "WebGL2RenderingContext.prototype.getParameter",
                apiCategory: APICategory.WebGL,
                callType: CallType.Read,
              });
            } catch (err) {
              logError("Failed to publish WebGL2RenderingContext instrumentation event.", err);
            }

            return original.apply(this, args);
          };

          // Mark wrapper as wrapped
          wrappedGetParameter[WRAPPED_SYMBOL] = true;

          Object.defineProperty(WebGL2RenderingContext.prototype, "getParameter", {
            ...desc,
            value: wrappedGetParameter,
          });
        }
      }
    } catch (err) {
      logError("Failed to wrap WebGL2RenderingContext.prototype.getParameter.", err);
    }
  }
}
