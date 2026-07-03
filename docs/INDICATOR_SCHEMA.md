# INDICATOR_SCHEMA.md

**Version:** 1.0.0  
**Status:** Draft  
**Depends On:** `BEHAVIORAL_INVARIANTS.md`, `OBSERVATION_SCHEMA.md`

---

# 1. Purpose

This document defines the Behavioral Indicator layer of FingerprintGuard.

Behavioral Indicators represent measurable quantities derived from Behavioral Observations.

They constitute the only inputs supplied to the machine learning classifier.

Behavioral Indicators are designed to quantify observable manifestations of the Behavioral Invariants defined in `BEHAVIORAL_INVARIANTS.md`.

---

# 2. Architectural Position

```text
Browser Execution
        │
        ▼
Behavioral Observations
        │
        ▼
Behavioral Indicators
        │
        ▼
Machine Learning Classifier
        │
        ▼
Prediction
```

Behavioral Indicators form the engineering bridge between raw browser observations and machine learning.

---

# 3. Design Principles

Every Behavioral Indicator shall satisfy the following principles.

- Directly derived from Behavioral Observations.
- Explainable.
- Privacy-preserving.
- API-agnostic wherever possible.
- Computationally lightweight.
- Experimentally reproducible.
- Mapped to at least one Behavioral Invariant.

Indicators violating any of these principles shall not be included in Version 1.

---

# 4. Indicator Lifecycle

Every indicator follows the same lifecycle.

```text
Behavioral Observation
        │
        ▼
Indicator Computation
        │
        ▼
Behavioral Indicator
        │
        ▼
Machine Learning Model
```

Indicators shall never use information outside the Observation Schema.

---

# 5. Indicator Categories

Behavioral Indicators are grouped into the following categories.

## I1 — Information Acquisition Indicators

Measure observable information acquisition behavior.

Examples:

- Information acquisition intensity
- Domain breadth
- Observation density

---

## I2 — Stealth Indicators

Measure visible versus non-visible execution characteristics.

Examples:

- Silent execution
- Background execution
- Rendering visibility

---

## I3 — Autonomy Indicators

Measure independence from user interaction.

Examples:

- User interaction independence
- Automatic execution
- Interaction dependency

---

## I4 — Cross-Domain Indicators

Measure coordination across functionally distinct browser subsystems.

Examples:

- Domain transitions
- Cross-domain diversity
- Multi-domain observation

---

# 6. Indicator Definition Template

Every indicator shall be documented using the following structure.

| Field | Description |
|---------|-------------|
| Indicator ID | Unique identifier |
| Indicator Name | Human-readable name |
| Category | Indicator category |
| Description | What is measured |
| Source Observations | Observation fields used |
| Related Invariant(s) | One or more Behavioral Invariants |
| Data Type | Integer / Float / Boolean |
| Expected Range | Valid values |
| Computation | Mathematical definition |
| Privacy Impact | Low / Medium / High |

---

# 7. Indicator Naming Convention

Indicator identifiers shall follow the format:

```
IND_<CATEGORY>_<NUMBER>
```

Examples:

```
IND_INFO_001
IND_STEALTH_003
IND_AUTO_002
IND_CROSS_004
```

---

# 8. Observation Dependency

Behavioral Indicators may only use observations defined in `OBSERVATION_SCHEMA.md`.

No external information shall be introduced during indicator computation.

This guarantees:

- Reproducibility
- Privacy
- Consistency
- Auditability

---

# 9. Mapping to Behavioral Invariants

Every Behavioral Indicator must explicitly measure one or more Behavioral Invariants.

Example mapping:

| Behavioral Invariant | Indicator Category |
|----------------------|-------------------|
| Entropy Maximization | Information Acquisition Indicators |
| Operational Stealth | Stealth Indicators |
| Autonomous Execution | Autonomy Indicators |
| Cross-Source Correlation | Cross-Domain Indicators |

Indicators without an invariant mapping shall not be included.

---

# 10. Indicator Validation

Before an indicator is accepted into FingerprintGuard, it must satisfy the following questions.

1. Is it directly derived from Behavioral Observations?

2. Does it preserve user privacy?

3. Does it measure at least one Behavioral Invariant?

4. Can it be computed efficiently?

5. Is it explainable?

6. Can it generalize across browser API categories?

Only indicators satisfying every requirement shall be included in Version 1.

---

# 11. Scope

This document defines the architecture and structure of Behavioral Indicators.

The concrete indicator catalogue used in Version 1 will be finalized after empirical evaluation and implementation.

This separation allows the theoretical framework to remain stable while permitting indicator refinement based on experimental evidence.

---

# 12. Future Extensions

Future versions may introduce:

- Adaptive indicators
- Learned indicators
- Graph-based indicators
- Sequence-based indicators
- Explainability indicators

These extensions are outside the scope of Version 1.