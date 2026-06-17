# Creating Test Scripts

Use this guide when adding or updating app automation.

Before creating a new flow, read [Automation Folder Guide](AUTOMATION-FOLDER-GUIDE.md) if the folder roles are not clear yet.

## Use This Pattern

The `sampleCheckout` flow shows the intended structure end to end:

| Template File | Copy/Rename Into |
| --- | --- |
| `models/sampleCheckoutModel.ts` | A model for your app's user, customer, account, order, request, or other test entity |
| `test-data/sampleCheckoutData.ts` | Realistic app-specific test data |
| `pages/sample*.ts` | Page objects for your app screens and components |
| `workflows/sampleCheckoutWorkflow.ts` | Business workflows such as login, search, create, submit, approve, checkout, or cancel |
| `tests/ui/sampleCheckout.spec.ts` | Actual UI tests for app behavior |

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

## Sample Versus Real App Artifacts

Use `sample*` files as a reference for structure and style. Once real app pages, workflows, models, and test data exist, reuse and extend those real artifacts before copying from the sample.
