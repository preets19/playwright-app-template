# Creating Test Scripts

Use this guide when adding or updating app automation.

Before creating a new flow, read [Automation Folder Guide](AUTOMATION-FOLDER-GUIDE.md) if the folder roles are not clear yet.

## Copy This Pattern

The login example shows the intended structure end to end:

| Template File | Copy/Rename Into |
| --- | --- |
| `models/userModel.ts` | A model for your app's user, customer, account, order, request, or other test entity |
| `test-data/users.ts` | Realistic app-specific test data |
| `pages/loginPage.ts` | Page objects for your app screens |
| `pages/homePage.ts` | Page objects for post-login or target screens |
| `workflows/loginWorkflow.ts` | Business workflows such as login, search, create, submit, approve, or cancel |
| `tests/ui/login.spec.ts` | Actual UI tests for app behavior |

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

## API And Database Samples

The template includes a runnable API sample under `tests/api`. It starts a local sample HTTP endpoint during the test, then uses the framework `apiClient` fixture and `ApiAssertions` helpers. This keeps the sample useful without depending on public internet access.

The template also includes a real SQL Server smoke test under `tests/database`. It is skipped by default because most machines will not have the sample database connection available. To run it, update `appsettings.json` with a valid SQL Server `database.connectionString`, then run with:

```text
RUN_DB_TESTS=true
```
