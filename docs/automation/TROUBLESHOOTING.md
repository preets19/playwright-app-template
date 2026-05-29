# Troubleshooting

Use this guide when setup, dashboard, Playwright UI, or tests are not behaving as expected.

## Setup Automation Failed

Check the command window for the first error message.

Common causes:

- Node or npm is not installed or is blocked by machine policy.
- The framework repo is not beside the template or app automation repo during local phased development.
- Enterprise npm registry settings are missing.
- Playwright browser downloads are blocked by network policy.

If `package.json` was changed, run `npm install` again.

## NPM Says Framework Tarball Is Corrupted Or EINTEGRITY

This can happen when `package-lock.json` was created with a different locally packed framework tarball than the one on this machine.

Try this from the template repo:

```powershell
Remove-Item package-lock.json -Force -ErrorAction SilentlyContinue
Remove-Item node_modules -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .npm-cache -Recurse -Force -ErrorAction SilentlyContinue
.\Setup Automation.cmd
```

The setup script refreshes the lockfile after rebuilding the local framework package.

## Dashboard Does Not Open

Try these steps:

1. Double-click `Stop Automation.cmd`.
2. Double-click `Start Automation Dashboard.cmd`.
3. Open `http://127.0.0.1:4310` manually in the browser.

If the dashboard still does not open, check whether another process is already using port `4310`.

## Browser Warns When Closing Dashboard

This is expected. The dashboard warns before closing because local automation processes may still be running.

Choose one of these options:

- Stay on the page and click `Stop Automation`.
- Close the tab anyway and let the dashboard server stop itself after a short grace period.
- Double-click `Stop Automation.cmd` for immediate cleanup.

## Dashboard Says Port 4310 Is Already In Use

This usually means the dashboard is already running.

Open this URL in your browser:

```text
http://127.0.0.1:4310
```

If that opens the dashboard, nothing is wrong.

If it opens something else or does not respond, double-click `Stop Automation.cmd`, then start the dashboard again.

## App Repo Does Not Appear In Dashboard

The dashboard only lists folders that look like app automation repos.

Check that the selected repo has:

- `package.json`
- `playwright.config.ts`
- `appsettings.json`
- A dependency on `@your-org/playwright-base-framework`

## Playwright UI Only Runs One Browser

Playwright Interactive UI is best for debugging one browser at a time.

Use `Run Tests Parallel` from the dashboard when you want to run the selected browsers from `appsettings.json`.

## Test Cannot Find A Locator

Start with the page object under `pages`.

Common causes:

- The selector changed in the application.
- The element appears after a delay.
- The test is on a different page than expected.
- The element is inside a modal, popup, iframe, or new browser tab.

Update the page object first. Avoid fixing selector problems directly in the test unless the locator is truly test-specific.

## Test Data Is Wrong

Start with `test-data`.

If the structure of the data changed, update the matching file under `models` too.

## App URL Is Wrong

Check `appsettings.json`.

For CI or environment-specific runs, check whether `APP_SETTINGS_PATH` is pointing to another settings file.

## Open Test Results Is Disabled

Run a test first. The report link is enabled after a test run creates the Playwright report.

If a test already ran, check whether the `playwright-report` folder exists in the repo.

## CI Fails But Local Passes

Check these items:

- CI is using the expected Node version.
- CI installed Playwright browsers.
- CI can reach the app URL.
- CI has required environment settings.
- The test does not depend on local-only data.
- No secrets are hard-coded in test files or settings.
