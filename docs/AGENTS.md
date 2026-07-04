# AGENTS.md

# FingerprintGuard Engineering Constitution

Version: 1.0.0

Status: Locked

---

# 1. Project Overview

FingerprintGuard is a research prototype investigating API-agnostic browser fingerprinting detection through behavioral analysis.

The objective is to determine whether browser fingerprinting exhibits stable behavioral characteristics that generalize across browser API categories.

This project is intended for academic publication.

Correctness, reproducibility, and maintainability always take priority over implementation speed.

---

# 2. General Engineering Principles

Always:

- Follow the project architecture.
- Prefer correctness over cleverness.
- Prefer readability over brevity.
- Keep modules small.
- Keep functions focused.
- Follow the Single Responsibility Principle.
- Use explicit typing.
- Keep implementations deterministic.
- Write production-quality code.

Never:

- Invent functionality that was not requested.
- Make architectural decisions without approval.
- Simplify the documented architecture.
- Introduce unnecessary abstractions.
- Generate placeholder implementations.
- Generate TODO or FIXME comments.
- Introduce technical debt intentionally.

---

# 3. Technology Stack

Language

- TypeScript

Build System

- esbuild

Extension Platform

- Chrome Extension Manifest V3

Compilation Target

- ES2020

TypeScript

- strict = true

---

# 4. Approved Dependencies

The following third-party dependencies are approved.

- TypeScript
- esbuild
- @types/chrome

No additional dependency may be introduced without explicit approval.

---

# 5. Architecture Rules

The project follows the following layered architecture.

Browser Execution

↓

Instrumentation

↓

Behavioral Observations

↓

Behavioral Indicators

↓

Machine Learning

↓

Prediction

Every implementation must preserve this architecture.

---

# 6. Module Responsibilities

## Injected Script

Responsible for:

- Browser API instrumentation
- Executing inside webpage context

Must never:

- Access Chrome extension APIs
- Store data
- Perform machine learning
- Compute behavioral indicators

---

## Content Script

Responsible for:

- Injecting webpage scripts
- Bridging webpage ↔ extension communication

Must never:

- Instrument browser APIs
- Compute observations
- Perform inference
- Store persistent data

---

## Background Service Worker

Responsible for:

- Receiving validated messages
- Routing messages
- Future orchestration

Must never:

- Modify webpage behavior
- Instrument browser APIs
- Compute behavioral indicators
- Perform machine learning

---

## Core Modules

Responsible for:

- Behavioral observations
- Behavioral indicators
- Shared algorithms

Must remain browser-independent whenever possible.

---

# 7. Privacy Rules

FingerprintGuard is privacy-preserving.

Never collect:

- Canvas hashes
- Audio fingerprints
- WebGL fingerprints
- GPU identifiers
- Browser identifiers
- Device identifiers
- Installed font lists
- Personally identifiable information
- Raw fingerprint values

Only behavioral metadata may be collected.

---

# 8. Coding Standards

Every source file should begin with:

Project:
Module:
Purpose:

Functions should:

- Be short.
- Have one responsibility.
- Avoid unnecessary nesting.
- Use early returns where appropriate.

Prefer:

- const over let
- unknown over any
- interfaces for shared contracts
- enums or literal types for fixed categories

Avoid:

- Magic strings
- Magic numbers
- Global mutable state

---

# 9. Error Handling

Validate inputs before processing.

Fail fast during development.

Only catch exceptions when meaningful recovery is possible.

Never silently swallow unexpected errors.

---

# 10. Logging

Use:

console.debug()

for development diagnostics.

Use:

console.error()

only for genuine failures.

Never use:

- alert()
- console.log() for production diagnostics

Every module should use:

const LOG_PREFIX = "[FingerprintGuard]";

---

# 11. Build Rules

Use:

- Manifest V3
- esbuild

Development builds:

- Source maps enabled

Production builds:

- Minified
- No source maps

---

# 12. Repository Structure

```
FingerprintGuard/

docs/
extension/
core/
ml/
dataset/
experiments/
paper/
tests/
tools/
```

Do not introduce additional architectural layers without approval.

---

# 13. Documentation Rules

Every public interface, class, and exported function should include documentation comments.

Keep comments focused on intent rather than implementation.

Documentation must remain synchronized with implementation.

---

# 14. Development Workflow

For every implementation task:

1. Explain the implementation plan.
2. Wait for approval.
3. Generate complete code.
4. Do not summarize files.
5. Do not omit imports.
6. Do not generate partial implementations.

---

# 15. Definition of Done

A task is complete only if:

- TypeScript compiles successfully.
- The project builds successfully.
- No unused variables remain.
- No placeholder implementations remain.
- The implementation follows the documented architecture.
- The implementation satisfies the requested requirements.
- No functionality outside the requested scope has been added.

---

# 16. Guiding Principle

Every design and implementation decision should answer the following question:

"Does this improve the scientific validity, reproducibility, maintainability, or privacy guarantees of FingerprintGuard?"

If the answer is no, the change should not be implemented.