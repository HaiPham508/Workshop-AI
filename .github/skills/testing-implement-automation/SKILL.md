---
name: testing-implement-automation
description: "Use when: implementing Playwright automation scripts from approved test cases using existing project assets."
---

# SKILL.md - Testing Implement Automation

## 1. Purpose
<!-- Why the skill exists, business objective, primary responsibility -->

Implement maintainable Playwright automation scripts from approved test cases while maximizing reuse of existing project fixtures, page objects, components, and test data.

---

## 2. When to Use
<!-- Situations where the skill should be executed -->

- When approved and automation-ready test cases exist.
- When page objects/components are available or already generated.
- When new or updated spec files are required for regression, smoke, or functional coverage.

---

## 3. Do Not Use When
<!-- What the skill is NOT responsible for -->

- When test cases are not approved or lack clear expected outcomes.
- When the task is to generate page objects/components from scratch.
- When the task is only reviewing automation quality without implementation.
- When the task requires changing application (system under test) source code.

---

## 4. Inputs
<!-- Required and Optional inputs (no processing logic) -->

### Required
- Approved Test Case Document(s): Test cases selected for automation.
- Existing Automation Context: Relevant fixtures/page objects/components in the project.

### Optional
- Test Data Inputs: Dedicated datasets or environment-specific values.
- Execution Scope: Suite target (smoke, regression, functional, api, e2e).
- Implementation Approach: Selected approach from Section 6. If not provided, ask the user before implementing.

---

## 5. Outputs
<!-- Files generated, reports, documents with naming conventions -->

| Output | Format | Naming Convention |
| ------ | ------ | ----------------- |
| UI Automation Spec | TypeScript (`.spec.ts`) | `<Requirement-or-Feature>-<Flow>.spec.ts` |
| API Automation Spec (if applicable) | TypeScript (`.spec.ts`) | `<Requirement-or-Feature>-api.spec.ts` |

Output location: `e2e/test/functions/`

---

## 6. Implementation Approaches
<!-- Supported ways to obtain UI/API knowledge and produce the automation script -->

The approach determines how locators and page behavior are discovered. Exactly one primary approach must be selected; secondary approaches may supplement it.

| ID | Approach | How it works | Requires | Best for | Trade-offs |
| -- | -------- | ------------ | -------- | -------- | ---------- |
| A1 | Live browser exploration | Open the running application in a browser (for example Playwright MCP), navigate the flow, capture the accessibility/DOM snapshot, then derive locators and steps | Reachable environment URL, valid test credentials | Highest locator accuracy; flows that depend on runtime state | Slowest; needs a working environment and data |
| A2 | Frontend source code analysis | Read component source (React/Angular/Vue and similar) to extract `data-testid`, roles, labels, and rendering conditions | Read access to the frontend repository | Stable, semantic locators; pre-deployment automation | Cannot confirm runtime-rendered content; must not modify app code |
| A3 | Static HTML/DOM artifact | Parse a saved HTML page, DOM snapshot, or exported markup | HTML/DOM file or snapshot | Offline work; no environment access | Snapshot may be stale; dynamic states not covered |
| A4 | Design/spec driven | Derive steps and expected results from the test case, mockups, or GUI spec, using placeholder locators marked `TODO-LOCATOR` | Approved test case; optional mockups | Parallel work before the UI exists | Locators must be confirmed later; specs are not runnable yet |
| A5 | Existing page object reuse | Compose the spec purely from already generated and reviewed page objects/components/fixtures | Page objects present and reviewed | Fastest; strongest consistency | Blocked when coverage gaps exist in the page object layer |
| A6 | API contract driven | Build API specs from an OpenAPI/Swagger contract, Postman collection, or captured request traces | API contract or traces | API and integration layer coverage | No UI validation; contract must be current |
| A7 | Recorder assisted | Start from Playwright Codegen or a recorded trace, then refactor into the project POM structure | Reachable environment; recorder tooling | Rapid first draft of long flows | Raw output violates standards; refactoring is mandatory |

Default selection when the user gives no preference and no clarification is possible: A5 combined with A2, falling back to A4.

Regardless of approach, all output must follow the project POM structure and Section 9 execution rules, and must never modify system-under-test source code.

---

## 7. Workflow
<!-- High-level workflow steps only -->

```text
1. Load Knowledge -> 2. Read Input -> 3. Confirm Implementation Approach -> 4. Map Approved Cases to Reusable Automation Design -> 5. Generate Output -> 6. Self Review
```

---

## 8. Knowledge Sources
<!-- Standards, Checklists, Templates, Examples to load -->

### Standards
- `references/standards/playwright-standard.md`
- `references/standards/assertion-standard.md`
- `references/standards/automation-coding-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/automation-review-checklist.md`

### Templates
- `references/templates/test.template.ts`
- `references/templates/api.template.ts`
- `references/templates/fixture.template.ts`

### Examples
- `references/examples/test-script-login-example.md`

---

## 9. Execution Rules
<!-- Execution sequence (read input, load knowledge, apply standards...) -->

1. Read approved test cases and identify automation-eligible scenarios.
2. Confirm the implementation approach (Section 6) before writing any code; ask the user when it is not provided.
3. Load Playwright, assertion, and automation coding standards.
4. Reuse existing page objects/components/fixtures/utilities before introducing new logic.
5. Implement traceable tests with clear arrange-act-assert flow.
6. Align assertions with expected results only; avoid unsupported checks.
7. Keep locators and page behavior encapsulated in page objects/components.
8. Never modify source code of the system under test; write only automation assets (specs, page objects, components, fixtures, test data, automation config).
9. Record the selected approach and locator evidence source in the spec header comment or handoff summary.
10. Validate generated specs with automation review checklist.

---

## 10. Decision Rules
<!-- Deterministic branching logic -->

1. If test case approval status is unclear, pause and request confirmation.
2. If the implementation approach is not specified, ask the user to choose from Section 6 and list the prerequisites each option needs.
3. If the selected approach is unavailable (for example environment down for A1, no repository access for A2), report the blocker and propose the next best available approach.
4. If required page objects/fixtures are missing, stop implementation and redirect to prerequisite skill.
5. If expected results are not measurable, request clarification before adding assertions.
6. If duplicated logic is detected, reuse existing utilities/components instead of new implementations.
7. If approach A4 or A7 is used, mark unverified locators explicitly and flag the spec as pending locator confirmation.
8. If automation cannot pass without an application change (for example a missing `data-testid`, defect, or unstable UI hook), do not edit the application code; report the required change as a recommendation or defect and hand off to the development team.

---

## 11. Knowledge Priority
<!-- Rule precedence -->

1. User instructions
2. SKILL.md
3. Standards
4. Checklists
5. Templates
6. Examples

---

## 12. Quality Gates
<!-- Mandatory validation before output -->

- [ ] Implementation approach confirmed and recorded
- [ ] Standards applied
- [ ] Checklists executed
- [ ] Template followed
- [ ] Output complete
- [ ] No system-under-test source files were created, modified, or deleted

---

## 13. Self Review
<!-- Checklist-driven self review -->

Before completing, execute:

- `references/checklists/automation-review-checklist.md`

Revise output if any applicable check fails.

---

## 14. Success Criteria
<!-- Measurable outcomes -->

- [ ] Spec files are generated in the correct suite location with consistent naming.
- [ ] Scripts are traceable to approved test cases and expected results.
- [ ] Reuse is maximized and no duplicate automation logic is introduced.
- [ ] All changes are confined to automation assets; application source code is unchanged.
- [ ] The implementation approach used and its locator evidence source are documented.

---

## 15. Next Skill
<!-- Downstream handoff -->

- `testing-review-automation`

---

## 16. Related Skills
<!-- Upstream and downstream skills only -->

- `testing-design-test-case`
- `testing-generate-page-object`
- `testing-review-automation`

---

## 17. Related Knowledge
<!-- Referenced knowledge files grouped by type -->

### Standards
- `references/standards/playwright-standard.md`
- `references/standards/assertion-standard.md`
- `references/standards/automation-coding-standard.md`
- `references/standards/automation-standard.md`

### Checklists
- `references/checklists/automation-review-checklist.md`

### Templates
- `references/templates/test.template.ts`
- `references/templates/api.template.ts`
- `references/templates/fixture.template.ts`

### Examples
- `references/examples/test-script-login-example.md`

### Shared Documents
- `references/project-knowledge/test-strategy.md`
