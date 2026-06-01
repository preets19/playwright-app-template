# Windows Launchers

These `.cmd` files avoid PowerShell execution policy issues.

The primary dashboard/tooling repo is now the sibling `playwright-automation-dashboard` repo. Keep dashboard and command-tool updates there. The launchers in this app template are retained during the transition for compatibility with existing app repos.

## First-Time Setup

Preferred setup path is Dashboard Home in `playwright-automation-dashboard`:

```text
1. Setup Automation
```

This installs npm dependencies and Playwright browsers.
In managed networks, configure your approved npm registry and any Playwright browser mirror environment variables before running setup.

## Daily Use

Preferred entry point:

```text
..\playwright-automation-dashboard\Start Automation Dashboard.cmd
```

This starts Dashboard Home and lets QA discover, load, set up, and open Test Dashboard for app automation repos.

## Optional Launchers

- `setup-once.cmd`: legacy direct setup launcher retained for compatibility.
- `start-dashboard.cmd`: legacy dashboard launcher retained for compatibility.
- Dashboard `Open Interactive UI`: opens Playwright Test Runner UI.
- Dashboard `Open Recorder UI`: opens Playwright Recorder.
- `run-validation.cmd`: runs the full validation check.
- `stop-automation.cmd`: legacy stop launcher retained for compatibility.
- `update-framework.cmd`: legacy framework update launcher retained for compatibility.

## Desktop Shortcut

Create a shortcut to the dashboard repo entry point:

```text
..\playwright-automation-dashboard\Start Automation Dashboard.cmd
```

Name it:

```text
Automation Dashboard
```

Use `playwright-automation-dashboard\scripts\windows\stop-automation.cmd` as a failsafe if the dashboard is unavailable.
