# playwright-app-template

Template repo for creating app-specific Playwright automation repos that consume `@your-org/playwright-base-framework`.

Enterprise teams can keep this repo as the reusable starting point. QA teams clone it, rename the folder for their actual application, update the settings and sample automation, then push that result to the app's own Git repo.

Before creating an app-specific repo from this template, review [REPO-CHECKLIST.md](REPO-CHECKLIST.md).

## Owns

- `_automation/pages`
- `_automation/workflows`
- `_automation/models`
- `_automation/tests`
- `_automation/test-data`
- `appsettings.json`
- template Playwright config for app automation
- app-specific automation code consumed by the dashboard repo

For the QA-facing guide, start with [_automation/README.md](_automation/README.md). Detailed guides live under [docs/automation](docs/automation).

## Dashboard Tooling

The QA dashboard and Windows command tools live in the sibling repo:

```text
..\playwright-automation-dashboard
```

Use that repo's `Start Automation Dashboard.cmd` as the primary QA entry point. Dashboard Home discovers app automation repos, loads the selected repo, runs setup and framework maintenance commands against it, and hands off to Test Dashboard for test execution.

Dashboard and command-tool updates should be made in `playwright-automation-dashboard`; this app template does not host dashboard or command-tool code.

## Consumes

During local phased development:

```json
{
  "devDependencies": {
    "@your-org/playwright-base-framework": "file:../playwright-base-framework/your-org-playwright-base-framework-1.0.0.tgz"
  }
}
```

Future GitHub/package dependency:

```json
{
  "devDependencies": {
    "@your-org/playwright-base-framework": "git+https://github.com/your-org/playwright-base-framework.git#v1.0.0"
  }
}
```

## First-Time Setup

From `playwright-automation-dashboard`, double-click:

```text
Start Automation Dashboard.cmd
```

Load this app automation repo, then click `1. Setup Automation`.
If both `playwright-app-template` and `playwright-base-framework` are side-by-side, setup will build and install the local framework package first.

## Daily Use

From `playwright-automation-dashboard`, double-click:

```text
Start Automation Dashboard.cmd
```

This opens Dashboard Home. The dashboard discovers app automation repos under:

```text
C:\Users\{current-user}\Source\Repo
```

Set `AUTOMATION_WORKSPACE_ROOT` before starting the dashboard if your enterprise workstation uses a different source folder.

Pick the automation repo you want to work with, run setup if needed, then open Test Dashboard to run tests, open Playwright Test Runner UI, or open Recorder UI.

The dashboard binds to `127.0.0.1` by default. Set `DASHBOARD_HOST` and `DASHBOARD_PORT` only if your local policy requires different values.

## Test Settings

`appsettings.json` defines the local browser settings used by both Playwright UI and dashboard test runs. The template uses a `1440x900` viewport as a conservative desktop default for enterprise machines with 1920x1200 displays and 125% Windows scaling.

## Enterprise Setup Notes

For locked-down networks, configure npm to use your approved internal registry before running setup. If Playwright browser downloads are mirrored internally, set `PLAYWRIGHT_DOWNLOAD_HOST` or `PLAYWRIGHT_BROWSERS_PATH` according to your company standard before running `Setup Automation` from Dashboard Home.

For CI or environment-specific settings, set:

```text
APP_SETTINGS_PATH=path\to\appsettings.enterprise.json
```

## Sample App

The template includes one canonical `sampleCheckout` UI flow against the Practice Software Testing Toolshop demo app. Use it as the reference for framework-compatible structure: models, test data, page objects, workflows, readiness waits, interaction helpers, and specs.

When this template becomes a real app repo, keep the sample only as long as it helps onboarding. New AI-generated tests should use the sample for style, then reuse and extend real app artifacts as they are added.

## Update Framework

Use Dashboard Home in `playwright-automation-dashboard` and click:

```text
4. Update Framework
```

This rebuilds the sibling framework package and reinstalls it into this template or app-specific automation repo.

See [docs/FRAMEWORK-DEPENDENCY.md](docs/FRAMEWORK-DEPENDENCY.md).
