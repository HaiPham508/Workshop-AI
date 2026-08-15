---
name: testing-review-test-case
description: "Use when: reviewing test case documents for completeness, correctness, coverage, consistency, and standards compliance."
---

# SKILL.md - Testing Review Test Case

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Review existing test case documents to identify quality issues, coverage gaps, duplication, and traceability problems, then provide structured and actionable recommendations.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When AI-generated or manually authored test cases need quality validation.
- When teams must confirm requirement/acceptance-criteria coverage.
- When pre-implementation review is required to reduce downstream rework.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When the primary task is to generate new test cases.
- When there are no test case artifacts available for review.
- When the task is to implement automation scripts directly.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Test Case File(s): Existing markdown test case documents to review.
- Review Scope: Functional, non-functional, or both.

### Optional
- Requirement References: User stories/acceptance criteria for traceability checks.
- Priority/Risk Context: Business criticality to assess test prioritization.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Test Case Review Report | Markdown (`.md`) | `Report-Review-Test-Case-<TestCaseFileName>.md` |
| Findings Summary | Markdown (`.md`) | `Findings-Review-Test-Case-<TestCaseFileName>.md` |

Output location: `working-artifacts/test-case-reviews/`

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Evaluate Coverage and Quality -> 4. Generate Output -> 5. Self Review
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `references/standards/testing-standard.md`
- `references/project-knowledge/test-strategy.md`
- `references/standards/test-design-approach.md`
- `references/standards/test-design-techniques.md`

### Checklists
- `references/checklists/clarification-rules.md`
- `references/checklists/test-case-review-checklist.md`

### Templates
- `references/templates/test-case.template.md`

### Examples
- `references/examples/review-test-case-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read test case inputs and determine review scope before evaluation.
2. Load standards, checklist, and template references from local skill knowledge base.
3. Validate requirement coverage, scenario completeness, and traceability.
4. Assess design technique usage, duplication, expected results, and data quality.
5. Classify findings by impact/risk and provide actionable recommendations.
6. Do not generate replacement test cases unless explicitly requested.
7. Validate report completeness before final output.

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If requirement references are missing, continue review and mark traceability coverage as partial.
2. If review scope (functional/non-functional/both) is unclear, request clarification before final verdict.
3. If critical coverage gaps are found, classify outcome as major revision required.
4. If findings are minor and non-blocking, classify as minor revision required.

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

- `references/checklists/test-case-review-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Review report identifies concrete coverage and quality issues.
- [ ] Findings are traceable to requirement/test-case evidence.
- [ ] Recommendations are actionable and prioritize highest risks first.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `testing-design-test-case` (for revisions)
- `testing-generate-page-object` (after approved test cases)

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-analyze-requirements`
- `testing-design-test-case`
- `testing-generate-page-object`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `references/standards/testing-standard.md`
- `references/project-knowledge/test-strategy.md`
- `references/standards/test-design-approach.md`
- `references/standards/test-design-techniques.md`

### Checklists
- `references/checklists/clarification-rules.md`
- `references/checklists/test-case-review-checklist.md`

### Templates
- `references/templates/test-case.template.md`

### Examples
- `references/examples/review-test-case-example.md`

### Shared Documents
- `references/checklists/clarification-questions.md`
