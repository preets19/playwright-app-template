# Creating Test Scripts

Use this guide when adding or updating app automation.

Before creating a new flow, read [Automation Folder Guide](AUTOMATION-FOLDER-GUIDE.md) if the folder roles are not clear yet.

## Use This Pattern

Build each scenario from app-specific artifacts:

| Artifact | Responsibility |
| --- | --- |
| `models` | Typed business data such as users, customers, accounts, orders, or requests |
| `test-data` | Realistic app-specific values and expected outcomes |
| `pages` | Locators, readiness, and UI actions for app screens and components |
| `workflows` | Reusable business capabilities such as login, search, create, approve, or checkout |
| `tests` | Thin executable scenarios that compose workflows and assert outcomes |

For example, a search feature might add:

```text
models/searchModel.ts
test-data/searchTerms.ts
pages/searchPage.ts
pages/searchResultsPage.ts
workflows/searchWorkflow.ts
tests/ui/search.spec.ts
```

## Naming

Use clear file names that match the app feature:

- Pages: `loginPage.ts`, `searchPage.ts`, `orderDetailsPage.ts`
- Workflows: `loginWorkflow.ts`, `searchWorkflow.ts`, `orderApprovalWorkflow.ts`
- Tests: `login.spec.ts`, `search.spec.ts`, `orderApproval.spec.ts`
- Models: `userModel.ts`, `searchModel.ts`, `orderModel.ts`

## Practical Guidelines

- Keep tests short and readable.
- Put selectors and UI mechanics in page classes.
- Put reusable business journeys in workflows.
- Put data values in test-data files.
- Use models when data is shared across multiple files.
- Prefer meaningful test names that describe the user-facing behavior.
- Avoid duplicating the same login, setup, or navigation steps across many tests.

Before creating an artifact, inspect existing real app pages, workflows, models, and test data. Reuse or extend a matching capability instead of duplicating it.
