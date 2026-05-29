# Framework Dependency

This template consumes the reusable framework package:

```text
@your-org/playwright-base-framework
```

## Current Phased Local Setup

While both projects live side-by-side in one workspace, `package.json` uses a local tarball:

```json
"@your-org/playwright-base-framework": "file:../playwright-base-framework/your-org-playwright-base-framework-1.0.0.tgz"
```

Use:

```text
Update Framework.cmd
```

to rebuild the sibling framework package and reinstall it into this template or app-specific automation repo.

## Future Separate Repo Setup

When an app-specific automation repo is created from this template, replace the local tarball dependency with the framework repo/package reference if your team will not keep the framework repo side-by-side.

GitHub tag example:

```json
"@your-org/playwright-base-framework": "git+https://github.com/your-org/playwright-base-framework.git#v1.0.0"
```

Private npm/GitHub Packages example:

```json
"@your-org/playwright-base-framework": "^1.0.0"
```

Then run:

```text
Setup Automation.cmd
```

## Ownership

Framework maintainers update `playwright-base-framework`.

QA/app teams update the app-specific automation repo:

- _automation/pages
- _automation/workflows
- _automation/tests
- _automation/models
- appsettings
- _automation/test-data
