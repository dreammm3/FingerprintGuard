# OBSERVATION_SCHEMA.md

**Version:** 1.0.0  
**Status:** Locked  
**Depends On:** `ARCHITECTURE.md`, `BEHAVIORAL_INVARIANTS.md`

---

# 1. Purpose

This document defines the Behavioral Observation Schema used by FingerprintGuard.

Behavioral Observations represent the lowest level of information collected by the system. They consist solely of observable browser execution events and contain no semantic interpretation.

Behavioral Observations serve as the input for Behavioral Indicator computation.

---

# 2. Design Principles

Every observation must satisfy the following principles.

- Directly observable.
- Privacy-preserving.
- API-independent.
- Lightweight to collect.
- Reproducible.
- Independent of raw fingerprint values.

Observations shall never require inference regarding attacker intent.

---

# 3. Observation Pipeline

```text
Browser Execution
        │
        ▼
Instrumentation
        │
        ▼
Behavioral Observations
        │
        ▼
Behavioral Indicators
        │
        ▼
Machine Learning
```

---

# 4. Observation Categories

## O1 — API Observation

Describes the browser API invocation itself.

Recorded fields:

- API Name
- API Category
- Call Type
- Timestamp
- Success Status

---

## O2 — Execution Context

Describes the execution environment.

Recorded fields:

- Main Thread / Worker
- Synchronous / Asynchronous
- Callback Execution
- Event Trigger

---

## O3 — DOM Context

Describes whether browser activity produces visible webpage effects.

Recorded fields:

- Attached to DOM
- Visible
- Width
- Height
- Display State
- Visibility State

No rendered pixels or browser output shall be collected.

---

## O4 — User Context

Describes whether meaningful user activity occurred.

Recorded fields:

- Click Event
- Scroll Event
- Keyboard Event
- Touch Event

Only event occurrence is stored.

User content is never collected.

---

## O5 — Temporal Context

Provides timing information.

Recorded fields:

- Absolute Timestamp
- Relative Timestamp
- Time Since Previous Observation
- Observation Window Identifier

---

## O6 — Session Context

Provides page-level execution state.

Recorded fields:

- Session Identifier
- Page Visibility
- Window Focus State
- Page Load Timestamp

---

# 5. Observation Record

Each observation represents a single browser event.

Example:

```json
{
  "timestamp": 1534,
  "api_name": "Canvas.toDataURL",
  "api_category": "Canvas",
  "call_type": "Read",
  "thread": "Main",
  "async": false,
  "dom_attached": true,
  "visible": false,
  "user_event": false,
  "window_id": 5
}
```

The structure above illustrates the observation format only.

It does not represent the final storage implementation.

---

# 6. Observation Window

Behavioral observations are grouped into fixed observation windows.

The observation window size W is treated as a configurable hyperparameter.

The optimal value shall be determined experimentally during evaluation.

Once selected, W remains fixed throughout all Version 1 experiments.

---

# 7. Privacy Constraints

Behavioral Observations shall never contain:

- Canvas hashes
- WebGL fingerprints
- Audio fingerprints
- Installed font lists
- GPU identifiers
- Browser identifiers
- Device identifiers
- Personally identifiable information
- Browser-generated entropy values

Only behavioral metadata may be recorded.

---

# 8. Observation Quality Requirements

Every observation must be:

- Deterministic
- Timestamped
- Lightweight
- Independently verifiable
- Suitable for offline replay
- Suitable for indicator computation

---

# 9. Mapping to Behavioral Indicators

Behavioral Observations are not used directly by the classifier.

Instead, observations are transformed into Behavioral Indicators.

Each Behavioral Indicator shall derive exclusively from the observation schema defined in this document.

No additional information may be introduced during indicator computation.

---

# 10. Scope

The Observation Schema is considered frozen for Version 1.

Additional observation types may be introduced in future versions only if they satisfy the design principles and privacy constraints defined in this document.