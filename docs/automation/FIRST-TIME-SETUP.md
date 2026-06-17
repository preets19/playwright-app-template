# First-Time Setup

Use this guide when a QA team clones `playwright-app-template` and turns it into a real app automation repo.

## Setup Steps

1. In folder `playwright-app-template`, update `playwright-app-template/package.json`:
   - Change `"name"` from the template name to the app automation package name.
   - Keep the dependency on `@your-org/playwright-base-framework`.
   - Keep the existing scripts unless your team has a reason to rename them.
   - Run `npm install` after changing `package.json` so `package-lock.json` stays in sync.
2. Update `playwright-app-template/README.md`:
   - Replace the template description with the app name and purpose.
   - Replace any demo app notes with app-specific setup notes.
   - Keep the setup, dashboard, and framework update instructions pointed at `playwright-automation-dashboard` if that is your team's tooling repo.
3. Update `playwright-app-template/.github/workflows/playwright.yml` if your repo uses GitHub Actions:
   - Change the workflow `name` to match the app.
   - Change artifact names or labels if they still use template wording.
   - Keep the validation, install, and Playwright test steps unless your CI standard requires a different shape.
4. Update `playwright-app-template/appsettings.json` with the app's base URL, browser defaults, and environment-specific settings.
5. Rename the repo folder from `playwright-app-template` to the actual application or product name.
6. Use the `sample*` files under `_automation` as examples for the first real test flow.
7. Replace or remove the sample checkout flow once app-specific automation is in place.

## Install Automation

After the repo has been renamed and configured, open the sibling dashboard repo:

```text
..\playwright-automation-dashboard
```

Double-click:

```text
Start Automation Dashboard.cmd
```

Load this app automation repo, then click `1. Setup Automation`.
This installs Node dependencies and Playwright browsers for the loaded repo.

## Quick Validation

After setup completes, use Dashboard Home to open Test Dashboard and run a test or open Playwright Interactive UI.

When finished, use `Stop Dashboard` from Dashboard Home or `Stop Automation` from Test Dashboard.

The dashboard repo is the primary place for dashboard/tooling updates; app repos should only contain app-specific automation code.
