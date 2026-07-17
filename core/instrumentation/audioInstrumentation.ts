// Project: FingerprintGuard
// Module: Core/Instrumentation/AudioInstrumentation
// Purpose: Instruments OfflineAudioContext and AudioBuffer APIs to observe audio-based tracking.

import { APICategory, CallType } from "./instrumentationEvent";
import { publish } from "./observationPublisher";
import { error as logError } from "./logger";

/**
 * Symbol used to mark already-instrumented prototypes.
 */
const WRAPPED_SYMBOL = Symbol("FingerprintGuard.Audio");

type StartRenderingFn = (() => Promise<AudioBuffer>) & {
  [WRAPPED_SYMBOL]?: boolean;
};

type GetChannelDataFn = ((channel: number) => Float32Array) & {
  [WRAPPED_SYMBOL]?: boolean;
};

/**
 * Initializes the instrumentation of Audio APIs.
 * This method checks each prototype individually for idempotency using the wrapper symbol.
 */
export function initializeAudioInstrumentation(): void {
  // Ensure DOM is available in the current execution context
  if (typeof window === "undefined") {
    return;
  }

  // 1. OfflineAudioContext.prototype.startRendering Instrumentation
  if (typeof OfflineAudioContext !== "undefined") {
    try {
      const desc = Object.getOwnPropertyDescriptor(
        OfflineAudioContext.prototype,
        "startRendering"
      );
      if (desc && typeof desc.value === "function") {
        const original = desc.value as StartRenderingFn;
        if (!original[WRAPPED_SYMBOL]) {
          const wrappedStartRendering = function (
            this: OfflineAudioContext,
            ...args: Parameters<StartRenderingFn>
          ): ReturnType<StartRenderingFn> {
            const timestamp = performance.now();

            try {
              publish({
                timestamp,
                apiName: "OfflineAudioContext.prototype.startRendering",
                apiCategory: APICategory.Audio,
                callType: CallType.Execute,
              });
            } catch (err) {
              logError("Failed to publish OfflineAudioContext.startRendering event.", err);
            }

            return original.apply(this, args);
          };

          // Mark wrapper as wrapped
          wrappedStartRendering[WRAPPED_SYMBOL] = true;

          Object.defineProperty(OfflineAudioContext.prototype, "startRendering", {
            ...desc,
            value: wrappedStartRendering,
          });
        }
      }
    } catch (err) {
      logError("Failed to wrap OfflineAudioContext.prototype.startRendering.", err);
    }
  }

  // 2. AudioBuffer.prototype.getChannelData Instrumentation
  if (typeof AudioBuffer !== "undefined") {
    try {
      const desc = Object.getOwnPropertyDescriptor(
        AudioBuffer.prototype,
        "getChannelData"
      );
      if (desc && typeof desc.value === "function") {
        const original = desc.value as GetChannelDataFn;
        if (!original[WRAPPED_SYMBOL]) {
          const wrappedGetChannelData = function (
            this: AudioBuffer,
            ...args: Parameters<GetChannelDataFn>
          ): ReturnType<GetChannelDataFn> {
            const timestamp = performance.now();

            try {
              publish({
                timestamp,
                apiName: "AudioBuffer.prototype.getChannelData",
                apiCategory: APICategory.Audio,
                callType: CallType.Read,
              });
            } catch (err) {
              logError("Failed to publish AudioBuffer.getChannelData event.", err);
            }

            return original.apply(this, args);
          };

          // Mark wrapper as wrapped
          wrappedGetChannelData[WRAPPED_SYMBOL] = true;

          Object.defineProperty(AudioBuffer.prototype, "getChannelData", {
            ...desc,
            value: wrappedGetChannelData,
          });
        }
      }
    } catch (err) {
      logError("Failed to wrap AudioBuffer.prototype.getChannelData.", err);
    }
  }
}
