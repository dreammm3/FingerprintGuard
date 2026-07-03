# FingerprintGuard

## Detecting Browser Fingerprinting via API-Agnostic Behavioral Generalization

---

Version: 0.1.0

Status: Draft

Document Type: Research & Engineering Specification

Repository: FingerprintGuard

Target Publication:
IET Smart Cities Symposium 2026

Primary Authors:
(To be filled)

Last Updated:
02 July 2026

---

# 1. Vision

## 1.1 Project Vision

FingerprintGuard is a browser-resident behavioral analysis framework designed to detect browser fingerprinting through generalized behavioral observation rather than API-specific signatures or raw fingerprint values.

Unlike conventional browser security extensions that rely on blocklists or predefined rules, FingerprintGuard investigates whether browser fingerprinting possesses an implementation-independent behavioral signature that remains detectable even when attackers migrate across fundamentally different browser APIs.

The project combines browser instrumentation, behavioral feature extraction, machine learning, and privacy-preserving local inference into a unified research framework whose primary objective is to validate this hypothesis experimentally.

FingerprintGuard is developed first as a research artifact and second as a browser extension.

Its primary deliverable is experimental evidence supporting or refuting the proposed research hypothesis.

---

## 1.2 Long-Term Vision

The architecture should remain extensible beyond browser fingerprinting.

Future work may adapt the same behavioral observation framework to detect:

• Session replay scripts

• Browser reconnaissance

• Client-side malware

• Privacy-invasive analytics

• Emerging browser tracking techniques

Browser fingerprinting serves as the first validation problem rather than the final application domain.

---

# 2. Problem Statement

Browser fingerprinting enables persistent user tracking without relying on cookies or explicit identifiers.

Current defenses generally fall into three categories.

Rule-based detection requires continuously updated signatures and fails against previously unseen implementations.

Randomization-based defenses attempt to modify browser outputs but may introduce compatibility issues and degrade legitimate website functionality.

Existing machine-learning approaches frequently model API-specific behavior, making it unclear whether reported performance reflects genuine understanding of fingerprinting behavior or memorization of known implementations.

Consequently, the cybersecurity community still lacks empirical evidence regarding whether browser fingerprinting possesses a generalized behavioral signature that transfers across browser API categories.

FingerprintGuard is designed specifically to investigate this question.

---

# 3. Research Question

Can browser fingerprinting be detected through generalized behavioral characteristics that remain consistent across different browser API categories?

---

# 4. Central Hypothesis

Browser fingerprinting exhibits a behavioral signature that is largely independent of the browser API exploited.

A model trained on behavioral observations rather than fingerprint values should therefore generalize to previously unseen API categories.

---

# 5. Research Contributions

The project is built around three research contributions.

## C1

Demonstrate that browser fingerprinting possesses an API-independent behavioral signature through leave-one-category-out evaluation.

This contribution represents the primary scientific claim of the project.

---

## C2

Evaluate the robustness of the learned behavioral signature against adversarial evasion strategies and quantify detection degradation before and after hardening.

---

## C3

Construct and release a labeled behavioral dataset suitable for evaluating browser fingerprinting generalization.

---

# 6. Project Objectives

The objectives of FingerprintGuard are:

• Observe browser behavior without collecting identifying information.

• Design behavioral features independent of fingerprint values.

• Build a lightweight browser instrumentation framework.

• Train generalized machine learning models.

• Evaluate cross-API generalization.

• Measure robustness against adversarial behavior.

• Preserve user privacy throughout the data collection pipeline.

---

# 7. Guiding Engineering Principles

Every engineering decision shall follow these principles.

## Privacy First

Raw fingerprint values shall never be collected.

Only behavioral metadata may be stored.

---

## Behavior Over Values

The system shall characterize how browser APIs are used rather than what information they return.

---

## Local Inference

Detection should occur locally whenever feasible.

Behavioral data should never require transmission to external servers during inference.

---

## Explainability

Behavioral features shall remain interpretable and individually justifiable.

Every feature included in the model must have a documented rationale.

---

## Modularity

Instrumentation, feature extraction, model inference, dataset generation, and evaluation shall remain independently replaceable components.

---

# 8. Scope

## In Scope

Browser instrumentation

Behavioral feature extraction

Canvas APIs

WebGL APIs

Audio APIs

Font APIs

Machine learning

Dataset construction

Experimental evaluation

Browser extension implementation

---

## Out of Scope

Network packet inspection

Browser fingerprint randomization

Server-side detection

Ad blocking

Cookie management

VPN functionality

General malware detection

---

# 9. Success Criteria

The project shall be considered successful if:

The browser extension operates reliably.

Behavioral features are successfully extracted.

A complete labeled dataset is constructed.

Machine-learning models complete training.

Leave-one-category-out evaluation is performed.

Experimental evidence supports or rejects the research hypothesis.

The project results are suitable for publication.

---

# 10. Deliverables

The project shall produce:

A browser extension.

A behavioral dataset.

Machine-learning training pipeline.

Evaluation framework.

Research paper.

Documentation.

Reproducible experiments.

---

# 11. Repository Philosophy

The repository shall function as a research artifact rather than only a software project.

Every implementation decision shall be documented.

Every experiment shall be reproducible.

Every figure appearing in the paper shall be generated directly from repository artifacts.

The repository should remain understandable by new contributors without external explanation.

---

# 12. Development Workflow

Research Discussion

↓

Specification Update

↓

Architecture Review

↓

Implementation

↓

Testing

↓

Evaluation

↓

Documentation

↓

Paper

No implementation shall precede specification.

---

# 13. Versioning Policy

Version 0.x

Research planning.

Version 1.x

Implementation.

Version 2.x

Experimental validation.

Version 3.x

Publication candidate.

---

# 14. Document Ownership

PROJECT_SPEC.md represents the highest-level engineering specification within the project.

All subsequent documents—including architecture, feature definitions, dataset specifications, implementation details, and evaluation protocols—must remain consistent with this specification.

Conflicts shall be resolved in favor of PROJECT_SPEC.md until an updated version is formally approved.