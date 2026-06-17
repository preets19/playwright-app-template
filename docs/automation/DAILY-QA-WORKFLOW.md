# Daily QA Workflow

Use this guide for normal day-to-day automation work.

## Typical Flow

1. Pull the latest changes from `main`.
2. From `playwright-automation-dashboard`, double-click `Start Automation Dashboard.cmd`.
3. In Dashboard Home, discover and load the app automation repo.
4. Run `Setup Automation` if dependencies, browser binaries, or framework package setup need to be refreshed.
5. Open Test Dashboard.
6. Open Playwright Interactive UI, open Recorder UI, or run tests in parallel from Test Dashboard.
7. Review the output and open test results from Test Dashboard.
8. Debug failures by updating the page, workflow, test data, or test file that owns the broken behavior.
9. Re-run the affected test until it passes.
10. Use `Back to Home` if you need to switch repos or run Home Dashboard tools.
11. Use `Stop Automation` from Test Dashboard or `Stop Dashboard` from Dashboard Home when finished.
12. Create a PR to merge the automation changes into `main` on GitHub.

## Running Tests

The dashboard starts locally on `127.0.0.1:4310`. If you close the dashboard browser tab, the browser may show a native leave-page warning. Use `Stop Automation` or `Stop Dashboard` when you want to shut down the dashboard and any Playwright tools immediately.

Use Playwright Interactive UI when you want to step through tests, inspect actions, or debug one scenario at a time.

Use `Run Tests Parallel` from Test Dashboard when you want a full local run using the browsers selected in `appsettings.json`.

Playwright Interactive UI and Recorder are started from Test Dashboard. Close the Playwright UI or Recorder window when finished, or use `Stop Automation`.

## Viewing Results

After a test run finishes, use `Open Test Results` from Test Dashboard.

The report is useful for:

- Seeing which tests passed or failed.
- Reviewing screenshots, videos, and traces from failures.
- Confirming whether the failure is from the app, the test script, test data, or environment setup.

## Before Creating A PR

Check these items before opening a PR:

- The test runs locally from the dashboard or Playwright UI.
- Test results were reviewed.
- New or changed files are under the right `_automation` folder.
- Template `sample*` references are removed or clearly separated if this is a real app repo.
- No passwords, tokens, or secrets are committed.
- `package-lock.json` is updated if `package.json` changed.
- The PR description explains what behavior is now covered.
