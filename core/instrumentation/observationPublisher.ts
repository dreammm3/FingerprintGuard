// Project: FingerprintGuard
// Module: Core/Instrumentation/ObservationPublisher
// Purpose: Publishes instrumentation events to the logging utility.

import { InstrumentationEvent } from "./instrumentationEvent";
import { debug } from "./logger";

/**
 * Publishes an instrumentation event by forwarding it to the logging utility.
 *
 * @param event The instrumentation event to publish.
 */
export function publish(event: InstrumentationEvent): void {
  debug(`API call observed: [${event.apiCategory}] ${event.apiName} (${event.callType})`, event);
}
