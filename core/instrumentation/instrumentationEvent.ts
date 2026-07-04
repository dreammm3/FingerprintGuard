// Project: FingerprintGuard
// Module: Core/Instrumentation/InstrumentationEvent
// Purpose: Defines the canonical InstrumentationEvent contract and associated types.

/**
 * Represents the categories of browser APIs that can be instrumented.
 */
export enum APICategory {
  Canvas = "Canvas",
  WebGL = "WebGL",
  Audio = "Audio",
  Navigator = "Navigator",
  Screen = "Screen",
  Fonts = "Fonts",
}

/**
 * Represents the type of interaction with an instrumented browser API.
 */
export enum CallType {
  Read = "Read",
  Write = "Write",
  Execute = "Execute",
}

/**
 * Represents a low-level browser API instrumentation event.
 * Contains only generic information immediately available during API wrapper execution.
 */
export interface InstrumentationEvent {
  /**
   * The timestamp of when the event occurred (in milliseconds since epoch or relative to page load).
   */
  readonly timestamp: number;

  /**
   * The specific name of the API being instrumented (e.g., "CanvasRenderingContext2D.getImageData").
   */
  readonly apiName: string;

  /**
   * The category of the browser API.
   */
  readonly apiCategory: APICategory;

  /**
   * The type of call interaction (Read, Write, or Execute).
   */
  readonly callType: CallType;
}
