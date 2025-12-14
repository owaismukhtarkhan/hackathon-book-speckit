<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: [PRINCIPLE_1_NAME] → Purpose & Target Audience, [PRINCIPLE_2_NAME] → Spec-Driven Development Methodology, [PRINCIPLE_3_NAME] → AI Usage & Governance, [PRINCIPLE_4_NAME] → Writing & Content Standards, [PRINCIPLE_5_NAME] → Code & Technical Quality Standards, [PRINCIPLE_6_NAME] → UI/UX, Accessibility & Performance Rules
Added sections: Learning Progression Model, Tooling & Deployment Requirements
Removed sections: None
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: RATIFICATION_DATE needs to be determined
-->

# AI / Spec-Driven Book Creation Constitution

## Core Principles

### Purpose & Target Audience
This constitution governs the creation of an AI-assisted, Spec-Driven textbook built using Docusaurus and deployed via GitHub Pages, produced as an official hackathon deliverable. The book is explicitly designed for absolute beginners and prioritizes production-grade implementation over theory, while enforcing strict standards for specifications, validation, accessibility, performance, and deployment.

This document is the single source of truth. Any artifact that violates this constitution is considered non-compliant and invalid.

### Spec-Driven Development Methodology
Spec-Kit Plus is mandatory for every chapter, every feature, every example, and every implementation. No chapter may exist without a corresponding spec. Each spec MUST explicitly define Purpose, Inputs, Outputs, Constraints, and Validation criteria.

### AI Usage & Governance
AI tools are permitted only as content refiners, editors, and structure improvers. AI tools MUST NOT act as autonomous authors or decision-makers. If AI APIs are required, Google Gemini MUST be used; OpenAI APIs are explicitly disallowed. All AI-assisted content MUST be reviewed, verified, and explicitly aligned with its governing spec.

### Writing & Content Standards
Content should follow minimal theory, maximum implementation, step-by-step execution, beginner-first explanations, and production-grade examples. The following are strictly forbidden: Long theoretical essays, placeholder or dummy code, pseudocode without execution context, unverified or hallucinated AI output.

### Code & Technical Quality Standards
All code and implementations MUST be production-grade, follow industry best practices, be buildable and deployable, use clear naming and structure. JavaScript is the default language; TypeScript MAY be used only if explicitly required and justified in the governing spec. Code that does not run or cannot be validated is non-compliant.

### UI/UX, Accessibility & Performance Rules
A Purple + Neon theme MUST be applied consistently across pages, components, navigation, and UI elements. All images and screenshots MUST include meaningful alt text. Lazy loading is mandatory for images and media assets. Mobile-first design is mandatory with layouts tested across viewports 320px to 2560px.

## Learning Progression Model

The book MUST follow a progressive complexity structure:

* **Weeks 1–2:** Fundamentals
* **Weeks 3–10:** Core skills
* **Weeks 11–13:** Advanced integration

Introducing advanced topics before prerequisite stages is prohibited.

## Tooling & Deployment Requirements

### Tooling
* **Docusaurus** is mandatory
* Markdown / MDX MUST follow Docusaurus standards

### Deployment
The book MUST:
* Be deployed on **GitHub Pages**
* Be publicly accessible
* Build successfully without errors

## Governance
This project is a hackathon submission. Any contribution that violates this constitution MUST be rejected and MUST be removed or corrected. No exceptions are permitted for time pressure, AI-generated content, or contributor experience level. This constitution is the single source of truth and supersedes all other practices.

**Version**: 1.1 | **Ratified**: TODO(RATIFICATION_DATE): Date of original adoption to be determined | **Last Amended**: 2025-12-14