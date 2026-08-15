---
name: testing-test-strategy
description: "Use when: creating a project-wide, risk-based test strategy covering the product, systems, releases, and testing approach before detailed test case design or automation planning."
---

# SKILL.md - Testing Test Strategy

## 1. Purpose

Create a project-wide, risk-based test strategy that defines the quality objectives, product scope, test approach, responsibilities, environments, data, tooling, risks, and quality gates across the project lifecycle.

---

## 2. When to Use

- When a project needs a single agreed testing approach across products, systems, teams, and releases.
- When the project needs to define quality objectives, test levels, test types, techniques, environments, and ownership.
- When project-wide risks, dependencies, constraints, or quality gates are unclear.
- Before detailed test case design, automation planning, release test planning, or formal test execution.

---

## 3. Do Not Use When

- When the task is only to analyze requirement completeness or testability.
- When the task is only to generate or review individual test cases.
- When the task is to implement automation, execute tests, or investigate a specific defect.
- When there is no project scope, product context, or business context to define the strategy.

---

## 4. Inputs

### Required

- **Project Context**: Project objectives, products, systems, teams, lifecycle, and major delivery milestones.
- **Business Context**: Business objectives, users, critical journeys, priorities, and expected outcomes.
- **Available Requirements**: Epics, features, user stories, acceptance criteria, specifications, business rules, or API contracts.

### Optional

- **Architecture and Dependencies**: Component diagram, integrations, services, data flows, and third-party dependencies.
- **Risk and Compliance Context**: Known risks, regulatory requirements, security needs, or quality history.
- **Delivery Context**: Release roadmap, team capacity, supported platforms, environments, and tooling.
- **Existing Test Assets**: Test cases, automation, test data, defect history, and monitoring information.

---

## 5. Outputs

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Project Test Strategy Document | Markdown (`.md`) | `Test-Strategy-<Project-Name>.md` |
| Project Test Strategy Findings Log | Markdown (`.md`) | `Findings-Test-Strategy-<Project-Name>.md` |

Output location: `working-artifacts/`

---

## 6. Workflow

```text
1. Load Knowledge -> 2. Read Project Inputs -> 3. Define Project Quality Objectives and Scope -> 4. Assess Project Risk -> 5. Design the Test Operating Model -> 6. Define Governance and Quality Gates -> 7. Generate Output -> 8. Self Review
```

---

## 7. Knowledge Sources

### Standards

- `references/standards/test-strategy-standard.md`

### Rules

- `references/rules/test-strategy-rules.md`

### Checklists

- `references/checklists/test-strategy-review-checklist.md`

### Templates

- `references/templates/test-strategy.template.md`

### Examples

- `references/examples/test-strategy-example.md`

Also apply the repository testing instructions and any project-specific standards supplied by the user.

---

## 8. Execution Rules

1. Read all provided project, business, requirement, architecture, delivery, and existing-test-asset inputs fully.
2. Load the standard, rules, checklist, template, and example from `references/` before planning.
3. Map the project scope across products, systems, components, user journeys, teams, and delivery stages; identify exclusions.
4. Define measurable project quality objectives and identify critical journeys, business rules, and cross-system flows.
5. Assess project risks using likelihood, impact, detectability, or the project's established risk model.
6. Define the test operating model across unit, component, integration, API, UI, accessibility, security, performance, compatibility, exploratory, and operational testing as applicable.
7. Define project-wide traceability, environments, test data, tools, responsibilities, dependencies, reporting, and release-level tailoring.
8. Define project quality gates plus entry, exit, suspension, resumption, and defect escalation criteria.
9. Identify assumptions, constraints, open questions, and residual risks with owners or follow-up actions where possible.
10. Generate the project strategy document and findings log using the template, naming conventions, and output location.
11. Perform self-validation before delivering the artifacts.

---

## 9. Decision Rules

1. If the project scope or business objective is missing, request clarification before finalizing the strategy.
2. If requirements are incomplete or contradictory, record the impact and link the affected area to `testing-analyze-requirements`; do not let one user story redefine the project strategy.
3. If risk context is missing, use an explicit qualitative risk model and label assumptions clearly.
4. If a test type is not applicable, state why it is excluded rather than leaving it unaddressed.
5. If time, environment, data, or team constraints prevent full coverage, prioritize by business risk and document residual risk.
6. If entry or exit criteria cannot be made measurable, mark the strategy as Draft and create clarification findings.
7. If the project contains multiple products, systems, teams, or releases, define the shared strategy once and document tailored exceptions or local quality gates separately.

---

## 10. Knowledge Priority

1. User instructions
2. SKILL.md
3. Standards
4. Checklists
5. Templates
6. Examples

---

## 11. Quality Gates

- [ ] Project scope and out-of-scope areas are explicit across products, systems, teams, and releases.
- [ ] Project quality objectives and critical cross-system journeys are identified.
- [ ] Risks are prioritized and linked to mitigation or coverage.
- [ ] Test levels, test types, techniques, and traceability are defined.
- [ ] Environment, data, tooling, ownership, and dependencies are documented.
- [ ] Entry, exit, suspension, and resumption criteria are measurable.
- [ ] Assumptions, constraints, open questions, and residual risks are recorded.
- [ ] Output documents follow the required names and location.

---

## 12. Self Review

Before completing, verify:

- [ ] `references/standards/test-strategy-standard.md` was applied.
- [ ] `references/rules/test-strategy-rules.md` was applied.
- [ ] `references/checklists/test-strategy-review-checklist.md` was completed.
- [ ] `references/templates/test-strategy.template.md` was followed.
- [ ] `references/examples/test-strategy-example.md` was consulted where applicable.
- [ ] Every project quality objective has a corresponding test approach or measurement.
- [ ] High-risk areas have explicit coverage, mitigation, or an accepted residual risk.
- [ ] Excluded test types have a documented rationale.
- [ ] The strategy is actionable by the test, development, product, and delivery teams.
- [ ] The strategy does not invent requirements or claim execution evidence that was not provided.

Revise the output if any applicable check fails.

---

## 13. Success Criteria

- [ ] A reviewable project test strategy is created in `working-artifacts/` with the correct naming convention.
- [ ] Project scope, objectives, risk priorities, operating model, resources, and quality gates are clear.
- [ ] Decisions, assumptions, constraints, and residual risks are evidence-based and actionable.
- [ ] The strategy provides a clear handoff to detailed test case design and automation planning.

---

## 14. Next Skill

- `testing-design-test-case`

---

## 15. Related Skills

- `testing-analyze-requirements`
- `testing-design-test-case`
- `testing-review-test-case`
- `testing-implement-automation`
- `testing-review-automation`
- `testing-analyze-bug`

---

## 16. Related Knowledge

### Standards

- `references/standards/test-strategy-standard.md`

### Rules

- `references/rules/test-strategy-rules.md`

### Checklists

- `references/checklists/test-strategy-review-checklist.md`

### Templates

- `references/templates/test-strategy.template.md`

### Examples

- `references/examples/test-strategy-example.md`

### Shared Documents

- `instructions/testing/copilot-instructions.md`
- `skills/testing-analyze-requirements/`
- `skills/testing-design-test-case/`
