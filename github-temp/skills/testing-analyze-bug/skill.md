---
name: testing-analyze-bug
description: "Use when: investigating reported defects to identify reproducible conditions, likely root cause area, impact, and next testing actions."
---

# SKILL.md - Testing Analyze Bug

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Analyze bug reports and supporting evidence to produce a clear, test-focused investigation outcome including reproducibility, impact, suspected root-cause area, and actionable next steps.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When a defect is reported and needs structured triage and investigation.
- When QA needs reproducible steps and evidence quality assessment before handoff.
- When teams need impact/risk analysis to prioritize fix and regression scope.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When the task is to implement a code fix directly.
- When no bug context or evidence is provided and cannot be clarified.
- When the task is to execute full regression or write full automation suites.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Bug Description: Reported issue summary including expected vs actual behavior.
- Reproduction Context: Environment, build/version, and affected feature/module.

### Optional
- Evidence Artifacts: Logs, screenshots, videos, network traces, stack traces.
- Related References: Linked requirement, test case, PR, commit, or previous defects.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Bug Investigation Report | Markdown (`.md`) | `Report-Bug-Analysis-<Bug-ID-or-Title>.md` |
| Bug Findings Log | Markdown (`.md`) | `Findings-Bug-Analysis-<Bug-ID-or-Title>.md` |

Output location: `reports/`

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Analyze Reproduction and Impact -> 4. Generate Output -> 5. Self Review
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `references/standards/testing-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/clarification-questions.md`
- `references/checklists/automation-review-checklist.md`

### Templates
- `references/templates/review-test-case-template.md`

### Examples
- `references/examples/review-test-case-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read bug details and available evidence completely.
2. Load relevant standards and workflow guidance before analysis.
3. Validate reproducibility, affected scope, and severity/risk indicators.
4. Identify likely failure area and dependencies without inventing unsupported causes.
5. Capture clear reproduction notes and evidence quality gaps.
6. Generate output with findings, impact, and next actions.
7. Perform self-validation before finalizing.

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If bug description or expected/actual behavior is missing, request clarification before analysis.
2. If evidence is insufficient for reproducibility, mark reproducibility as Unconfirmed and list required evidence.
3. If critical dependency information is unavailable, stop root-cause localization and report blocked analysis.
4. If issue is not reproducible but impact is high, recommend targeted monitoring and additional data capture.

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

- `references/workflows/bug-investigation.md`
- `references/checklists/automation-review-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Investigation report clearly states reproducibility, impact, and evidence-backed findings.
- [ ] Suspected root-cause area and dependencies are documented without unsupported assumptions.
- [ ] Actionable next steps for fix validation and regression scope are provided.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `testing-implement-automation` (for fix-verification automation updates)
- `testing-review-automation` (for reviewing impacted automation quality)

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-analyze-requirements`
- `testing-design-test-case`
- `testing-implement-automation`
- `testing-review-automation`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `references/standards/testing-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/clarification-questions.md`
- `references/checklists/automation-review-checklist.md`

### Templates
- `references/templates/review-test-case-template.md`

### Examples
- `references/examples/review-test-case-example.md`

### Shared Documents
- `references/workflows/bug-investigation.md`
