# App Automation Guide

This folder contains the template app automation code that QA and app teams copy and adapt most often.

The included `sampleCheckout` flow is the canonical reference implementation for this template. It shows how models, test data, page objects, workflows, readiness waits, framework interaction helpers, and specs fit together.

Treat `sample*` artifacts as examples. When the repo has real app automation, prefer reusing and extending the real pages, workflows, models, and test data instead of copying the sample blindly.

## Start Here

1. [First-Time Setup](../docs/automation/FIRST-TIME-SETUP.md): use this when creating a real app automation repo from `playwright-app-template`.
2. [Automation Folder Guide](../docs/automation/AUTOMATION-FOLDER-GUIDE.md): use this to understand `models`, `test-data`, `pages`, `workflows`, and `tests`.
3. [Creating Test Scripts](../docs/automation/CREATING-TEST-SCRIPTS.md): use this when adding or updating automation scripts.
4. [Daily QA Workflow](../docs/automation/DAILY-QA-WORKFLOW.md): use this for normal day-to-day testing, debugging, reports, and PRs.
5. [Troubleshooting](../docs/automation/TROUBLESHOOTING.md): use this when setup, dashboard, Playwright UI, or tests are not behaving as expected.
