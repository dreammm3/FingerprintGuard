# FingerprintGuard Architecture

**Version:** 0.2.0  
**Status:** Draft  

**Depends On:** `PROJECT_SPEC.md v0.1`

---

# 1. Purpose

This document defines the high-level software architecture of FingerprintGuard.

It specifies:

- System components
- Component responsibilities
- Browser extension lifecycle
- Data flow
- Module interactions
- Architectural constraints

This document intentionally excludes implementation details.

---

# 2. Architectural Philosophy

FingerprintGuard follows a layered architecture where each layer has a single responsibility.

Each component communicates only through well-defined interfaces. This separation ensures:

- Modularity
- Privacy
- Maintainability
- Testability
- Reproducibility

The architecture is designed to allow independent replacement of instrumentation, feature extraction, machine learning, and user interface components without affecting the rest of the system.

---

# 3. High-Level Architecture

```text
Browser
   │
   ▼
┌──────────────────────────────┐
│ Background Service Worker    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Content Script               │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Injected Script              │
│ (API Instrumentation)        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Feature Extraction Engine    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Local Storage                │
└──────────────┬───────────────┘
               │
      ┌────────┴─────────┐
      ▼                  ▼
┌──────────────┐   ┌──────────────┐
│ ML Inference │   │ Dataset      │
│ Engine       │   │ Exporter     │
└──────┬───────┘   └──────────────┘
       │
       ▼
┌──────────────────────────────┐
│ Browser Popup                │
└──────────────────────────────┘
```

---

# 4. System Components

## 4.1 Background Service Worker

### Purpose

Acts as the central coordinator of the browser extension.

### Responsibilities

- Initialize the extension
- Register browser event listeners
- Coordinate communication between modules
- Trigger feature extraction
- Manage local storage
- Execute machine learning inference
- Handle dataset export requests

### Inputs

- Browser lifecycle events
- Messages from Content Script

### Outputs

- System events
- Prediction requests
- Storage operations

---

## 4.2 Injected Script

### Purpose

Execute inside the webpage context to observe browser API usage.

### Responsibilities

- Instrument browser APIs
- Observe browser behavior
- Record behavioral events
- Preserve original webpage functionality

### Constraints

- Never modify webpage behavior
- Never collect fingerprint values
- Never interfere with webpage execution

### Inputs

- Browser API calls

### Outputs

- Behavioral events

---

## 4.3 Content Script

### Purpose

Bridge communication between the webpage context and the extension.

### Responsibilities

- Receive behavioral events
- Aggregate session events
- Forward observations to the Background Service Worker

### Inputs

- Behavioral events

### Outputs

- Raw behavioral session

---

## 4.4 Feature Extraction Engine

### Purpose

Convert behavioral observations into numerical feature vectors.

### Responsibilities

- Aggregate behavioral events
- Compute statistical features
- Generate feature vectors
- Process observations within a configurable session time window

### Inputs

- Raw behavioral session

### Outputs

- Feature vector

---

## 4.5 Local Storage

### Purpose

Store intermediate observations locally.

### Responsibilities

- Store feature vectors
- Store session metadata
- Cache trained ML models
- Store extension settings

### Inputs

- Feature vectors

### Outputs

- Stored behavioral observations

---

## 4.6 ML Inference Engine

### Purpose

Predict whether observed behavior represents browser fingerprinting.

### Responsibilities

- Load ONNX model
- Execute local inference
- Produce prediction score
- Return confidence score

### Inputs

- Feature vectors from Local Storage

### Outputs

- Prediction
- Confidence score

---

## 4.7 Dataset Export Module

### Purpose

Generate datasets for offline research and model training.

### Responsibilities

- Export feature vectors
- Export metadata
- Export labels

### Inputs

- Feature vectors from Local Storage

### Outputs

- CSV dataset
- JSON dataset

---

## 4.8 Browser Popup

### Purpose

Provide real-time feedback to the user.

### Responsibilities

- Display prediction
- Display confidence score
- Display behavioral statistics
- Trigger dataset export

### Inputs

- Prediction results

### Outputs

- User interface

---

# 5. Browser Extension Lifecycle

```text
Browser Starts
      │
      ▼
Background Service Worker Initializes
      │
      ▼
Registers Event Listeners
      │
      ▼
User Opens Webpage
      │
      ▼
Content Script Loads
      │
      ▼
Injected Script Executes
      │
      ▼
Browser APIs Instrumented
      │
      ▼
Behavioral Events Generated
      │
      ▼
Feature Extraction Executes
      │
      ▼
Feature Vector Stored
      │
      ▼
ML Inference Executes
      │
      ▼
Prediction Generated
      │
      ▼
Popup Displays Result
      │
      ▼
(Optional)
Dataset Export
```

---

# 6. Data Flow

```text
Browser API Call
        │
        ▼
Instrumentation
        │
        ▼
Behavior Event
        │
        ▼
Feature Extraction
        │
        ▼
Feature Vector
        │
        ▼
Local Storage
        │
        ├──────────────► Dataset Export
        │
        ▼
ML Inference
        │
        ▼
Prediction
        │
        ▼
Browser Popup
```

---

# 7. Communication Flow

```text
Injected Script
        │
window.postMessage()
        │
        ▼
Content Script
        │
chrome.runtime.sendMessage()
        │
        ▼
Background Service Worker
        │
        ▼
Feature Extraction Engine
        │
        ▼
Local Storage
        │
        ├────────────► Dataset Export
        │
        ▼
ML Inference
        │
        ▼
Browser Popup
```

---

# 8. Module Dependencies

| Module | Depends On |
|----------|------------|
| Background Service Worker | None |
| Injected Script | Webpage Context |
| Content Script | Injected Script |
| Feature Extraction Engine | Content Script |
| Local Storage | Feature Extraction Engine |
| ML Inference Engine | Local Storage |
| Dataset Export Module | Local Storage |
| Browser Popup | ML Inference Engine |

---

# 9. Security Principles

The architecture follows the following principles:

- No raw fingerprint values shall be collected.
- No browser hardware identifiers shall be stored.
- Local inference shall be preferred.
- Only behavioral metadata shall be processed.
- Browser permissions shall remain minimal.
- Personally identifiable information shall never be collected.

---

# 10. Extensibility

The architecture is designed to support future extensions through modular replacement of:

- Browser APIs
- Feature extraction algorithms
- Machine learning models
- Storage implementations
- User interfaces

Future versions may additionally introduce:

- Explainable AI (SHAP)
- Federated Learning
- Additional browser APIs
- Multi-browser support
- Additional attack categories

These capabilities are outside the scope of Version 1.

---

# 11. Non-Functional Goals

### Performance

Feature extraction and inference should execute with minimal user-visible latency.

### Privacy

No personally identifiable information shall be collected or transmitted.

### Maintainability

Each module shall remain independently replaceable.

### Scalability

The architecture shall support future browser APIs without major redesign.

### Reproducibility

All experiments should be reproducible from repository artifacts.

---

# 12. Architecture Constraints

The architecture shall not:

- Depend on server-side inference
- Collect raw fingerprint values
- Modify webpage functionality
- Require continuous cloud connectivity
- Store personally identifiable information