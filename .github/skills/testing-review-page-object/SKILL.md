---
name: testing-review-page-object
description: "Use when: reviewing page objects and components for POM compliance, locator quality, reuse, and maintainability."
---

# SKILL.md - Testing Review Page Object

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Review page object and component implementations to ensure they follow POM architecture, locator quality standards, coding conventions, and reuse principles before automation consumption.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When new page objects/components are added or modified.
- When pre-merge quality validation is required for automation foundations.
- When teams need maintainability and reuse assessment of page model code.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When the task is to generate new page objects/components.
- When the task is to generate or review complete test specs instead.
- When the task is to execute tests or investigate runtime failures only.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Page Object Files: Source files under `src/pages/` and related component files.
- Review Scope: Changed files, feature area, or PR context.

### Optional
- Related Test Cases/Requirements: For traceability and method intent validation.
- UI Context: URL, mockups, or DOM references for locator sanity checks.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| Page Object Review Report | Markdown (`.md`) | `Report-Review-Page-Object-<Scope-or-PR>.md` |
| Findings Summary | Markdown (`.md`) | `Findings-Review-Page-Object-<Scope-or-PR>.md` |

Output location: `working-artifacts/page-object-reviews-report/`

---

## 6. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Inspect Live Page (MCP) or Read Source Code -> 4. Evaluate POM, Locators, and Reuse -> 5. Generate Output -> 6. Self Review
```

**Step 3 — Locator Sanity-Check Strategy:**

```text
Playwright MCP available?
        │
 ┌──────┴──────┐
 │             │
 │ Yes         │ No
 │             │
 ▼             ▼
Navigate to   Read source
live page     code only
(browser_navigate,
browser_snapshot)
        │
        ▼
Verify claimed locators
against actual rendered DOM
(roles, labels, IDs, test IDs)
        │
        ▼
Proceed to Step 4
```

---

## 7. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `references/standards/pom-standard.md`
- `references/standards/locator-standard.md`
- `references/standards/page-object-standard.md`
- `references/standards/automation-coding-standard.md`

### Checklists
- `references/checklists/page-object-review-checklist.md`

### Templates
- `references/templates/page-object.template.ts`
- `references/templates/component.template.ts`

### Examples
- `references/examples/test-script-login-example.md`

---

## 8. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read all files in scope and understand page/component responsibilities.
2. Load POM, locator, and coding standards plus review checklist.
3. Validate locators against live or source DOM evidence:
   - If Playwright MCP tools are available, use `browser_navigate` to open the target URL and `browser_snapshot` to capture the rendered DOM. Cross-check each locator in the page object against actual element roles, labels, IDs, and `data-testid` attributes in the snapshot.
   - If Playwright MCP is unavailable, fall back to reading frontend source files (`.tsx`, `.html`, etc.) to verify locator accuracy. Note the evidence approach used in the review report.
4. Evaluate class design, encapsulation, method semantics, and duplication.
5. Review locator robustness and preferred selector strategy usage.
6. Identify anti-patterns (assertions in page objects, test logic leakage, brittle selectors).
7. Produce severity-tagged findings with concrete recommendations.
8. Do not modify source unless explicitly requested.

---

## 9. Decision Rules
<!-- Deterministic branching logic -->

1. If reviewed files are incomplete for the declared scope, request missing files before final decision.
2. If Playwright MCP tools are available, always use `browser_navigate` + `browser_snapshot` to verify actual DOM structure before assessing locator quality. Do not rely solely on source code when live inspection is possible.
3. If Playwright MCP tools are unavailable, fall back to reading frontend source files to verify locator accuracy. Document the evidence approach (live DOM or source code) in the review report.
4. If locator quality is high risk (brittle selectors), mark as blocking recommendation.
5. If architecture violations are non-blocking, classify with severity and provide remediation actions.
6. If requested change involves code generation, redirect to `testing-generate-page-object`.

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

- `references/checklists/page-object-review-checklist.md`

Revise output if any applicable check fails.

---

## 13. Success Criteria
<!-- Measurable outcomes -->

- [ ] Review output covers architecture, locator quality, and maintainability risks.
- [ ] Findings are specific, evidence-based, and prioritized by severity.
- [ ] Recommendations support safe reuse by downstream automation scripts.

---

## 14. Next Skill
<!-- Downstream handoff -->

- `testing-implement-automation`

---

## 15. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-generate-page-object`
- `testing-implement-automation`
- `testing-review-automation`

---

## 16. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `references/standards/pom-standard.md`
- `references/standards/locator-standard.md`
- `references/standards/page-object-standard.md`
- `references/standards/automation-coding-standard.md`

### Checklists
- `references/checklists/page-object-review-checklist.md`

### Templates
- `references/templates/page-object.template.ts`
- `references/templates/component.template.ts`

### Examples
- `references/examples/test-script-login-example.md`

### Shared Documents
- `references/project-knowledge/test-strategy.md`
