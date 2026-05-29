# App Template Checklist

Before publishing this template or creating an app-specific repo from it:

- `Setup Automation.cmd` completes on a clean machine.
- `npm.cmd run validate` succeeds.
- `Start Automation Dashboard.cmd` opens the dashboard.
- Dashboard can select an automation repo under the current user's `Source\Repo`.
- Dashboard workspace root can be overridden with `AUTOMATION_WORKSPACE_ROOT`.
- Dashboard binds to loopback by default and uses a local session cookie for API/report routes.
- Dashboard has buttons for Playwright Test Runner UI and Recorder UI.
- `Stop Automation.cmd` stops local automation backend processes where allowed.
- `_automation/` contains template pages, workflows, tests, models, and test data that QA can copy and adapt.
- `package.json` consumes the framework from the intended source.
- `.github/workflows/playwright.yml` is present.
- `.gitignore` excludes generated reports, results, caches, and `node_modules`.

When the framework moves to GitHub or a private registry, update `package.json` from the local tarball dependency to the versioned dependency.
