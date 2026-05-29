# Daily QA Workflow

Use this guide for normal day-to-day automation work.

## Typical Flow

1. Pull the latest changes from `main`.
2. Double-click `Start Automation Dashboard.cmd`.
3. Pick the automation repo in the dashboard.
4. Open Playwright Interactive UI, open Recorder UI, or run tests in parallel from the dashboard.
5. Review the output and open test results from the dashboard.
6. Debug failures by updating the page, workflow, test data, or test file that owns the broken behavior.
7. Re-run the affected test until it passes.
8. Close the Playwright UI browser tab or window when finished.
9. Close the dashboard browser tab or double-click `Stop Automation.cmd`.
10. Create a PR to merge the automation changes into `main` on GitHub.

## Running Tests

The dashboard starts in the background. After double-clicking `Start Automation Dashboard.cmd`, the command prompt may close immediately while the browser opens the dashboard. If you close the dashboard browser tab, the browser will show a native leave-page warning. If the tab is closed anyway, the dashboard server stops itself after a short grace period. Use `Stop Automation.cmd` when you want to shut down the dashboard and any Playwright tools immediately.

Use Playwright Interactive UI when you want to step through tests, inspect actions, or debug one scenario at a time.

Use `Run Tests Parallel` from the dashboard when you want a full local run using the browsers selected in `appsettings.json`.

Playwright Interactive UI and Recorder are started in the background from the dashboard. You do not need to keep a separate command prompt open for them. Close the Playwright UI or Recorder window when finished, or use `Stop Automation.cmd`.

## Viewing Results

After a test run finishes, use `Open Test Results` from the dashboard.

The report is useful for:

- Seeing which tests passed or failed.
- Reviewing screenshots, videos, and traces from failures.
- Confirming whether the failure is from the app, the test script, test data, or environment setup.

## Before Creating A PR

Check these items before opening a PR:

- The test runs locally from the dashboard or Playwright UI.
- Test results were reviewed.
- New or changed files are under the right `_automation` folder.
- Demo SauceDemo references are removed if this is a real app repo.
- No passwords, tokens, or secrets are committed.
- `package-lock.json` is updated if `package.json` changed.
- The PR description explains what behavior is now covered.
