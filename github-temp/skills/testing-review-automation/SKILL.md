---
name: testing-review-automation
description: "Use when: reviewing Playwright automation scripts for quality, standards compliance, maintainability, and risk."
---

# SKILL.md - Testing Review Automation

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Review existing Playwright automation artifacts to identify defects, maintainability risks, standards violations, and coverage weaknesses before merge or release.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When new or updated automation scripts are submitted for QA/code review.
- When pull request validation requires standards and risk assessment.
- When teams need actionable findings before merging automation changes.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When the task is to generate new test cases or new automation scripts.
- When no automation code or related artifacts are provided for review.
- When the request is to execute tests rather than review implementation quality.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Automation Source Files: Relevant Playwright spec and support files to review.
- Review Scope: Target area (feature, PR, suite, or changed files).

### Optional
- Requirement/Test Case Links: To verify traceability and coverage alignment.
- Execution Evidence: Recent failures, logs, or flaky behavior notes.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Automation Review Report | Markdown (`.md`) | `Report-Review-Automation-<Scope-or-PR>.md` |
| Findings Summary | Markdown (`.md`) | `Findings-Review-Automation-<Scope-or-PR>.md` |

Output location: `working-artifacts/test-reviews/`

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Assess Standards, Reliability, and Coverage Risks -> 4. Generate Output -> 5. Self Review
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `references/standards/playwright-standard.md`
- `references/standards/assertion-standard.md`
- `references/standards/automation-coding-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/automation-review-checklist.md`
- `references/checklists/pull-request-checklist.md`

### Templates
- `references/templates/review-test-case-template.md`

### Examples
- `references/examples/test-script-login-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read review scope and collect all impacted automation files.
2. Load applicable standards and review checklist.
3. Assess code quality, reliability, maintainability, and anti-patterns.
4. Verify traceability to requirements/test cases where references exist.
5. Classify findings by severity and provide actionable recommendations.
6. Do not modify source files unless explicitly requested.
7. Validate report completeness before final output.

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If review scope is unclear, request file/scope clarification before review.
2. If referenced requirements/test cases are unavailable, perform code-quality review and flag traceability as partial.
3. If severe risk is found, classify as blocking and recommend no-merge until resolved.
4. If findings are minor and non-blocking, recommend merge with follow-up actions.

---

## 10. Knowledge Priority
<!-- Rule precedence -->

1. User instructions
2. SKILL.md
3. Standards
4. Checklists
5. Templates
6. Examples

---

## 11. Quality Gates
<!-- Mandatory validation before output -->

- [ ] Standards applied
- [ ] Checklists executed
- [ ] Template followed
- [ ] Output complete

---

## 12. Self Review
<!-- Checklist-driven self review -->

Before completing, execute:

- `references/checklists/automation-review-checklist.md`
- `references/checklists/pull-request-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Review report identifies concrete findings with severity and evidence.
- [ ] Recommendations are actionable and aligned with project standards.
- [ ] Decision outcome clearly supports merge-readiness assessment.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `testing-implement-automation` (if fixes are required)

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-implement-automation`
- `testing-review-page-object`
- `testing-analyze-bug`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `references/standards/playwright-standard.md`
- `references/standards/assertion-standard.md`
- `references/standards/automation-coding-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/automation-review-checklist.md`
- `references/checklists/pull-request-checklist.md`

### Templates
- `references/templates/review-test-case-template.md`

### Examples
- `references/examples/test-script-login-example.md`

### Shared Documents
- `references/project-knowledge/test-strategy.md`
