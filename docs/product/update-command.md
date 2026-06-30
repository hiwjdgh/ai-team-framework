# Update Command Design

## Purpose

The `update` command will help users refresh framework-managed guidance and generated project support files without overwriting user-owned project context.

The command must preserve the separation between:

- `.ai-team/core/`: framework-managed metadata and guidance
- `.ai-team/user/`: user-owned extensions, notes, decisions, and prompts

## Target Command

```bash
npx ai-team-framework update
```

Optional future flags:

```bash
npx ai-team-framework update --dry-run
npx ai-team-framework update --write-report
npx ai-team-framework update --accept-core
```

## Primary Goals

- Detect whether the current directory is an AI Team Framework generated project.
- Read `.ai-team/manifest.json`.
- Identify the generator and generator version.
- Generate the latest framework-managed metadata into a temporary update plan.
- Compare new core guidance with existing `.ai-team/core/`.
- Preserve `.ai-team/user/` without modification.
- Produce an update report before writing changes.

## Non-Goals For First Version

- Do not rewrite user application code automatically.
- Do not merge arbitrary user edits inside `.ai-team/core/`.
- Do not overwrite `.ai-team/user/`.
- Do not run package manager installs.
- Do not publish or commit changes automatically.

## Required Project Structure

The command expects:

```text
.ai-team/
  README.md
  manifest.json
  core/
  user/
```

If `.ai-team/manifest.json` is missing, the command should stop and explain that the project is not recognized as an AI Team Framework generated project.

## Manifest Contract

Example:

```json
{
  "framework": "ai-team-framework",
  "frameworkVersion": "0.1.0",
  "generator": "corporate-homepage",
  "generatorVersion": "0.1.0",
  "projectType": "corporate-homepage",
  "createdAt": "2026-06-30T00:00:00.000Z",
  "managedPaths": [".ai-team/core"],
  "protectedPaths": [".ai-team/user"]
}
```

## Safety Rules

1. Never write to paths listed in `protectedPaths`.
2. Never delete `.ai-team/user/`.
3. Default to dry-run behavior until the user explicitly accepts changes.
4. Write an update report for every run.
5. If a managed file has user edits, report the diff instead of overwriting silently.
6. If the manifest is invalid, stop without writing changes.

## Update Report

The command should write:

```text
.ai-team/update-report.md
```

Report contents:

- Current framework version
- Current generator version
- Available framework version
- Available generator version
- Files that would change
- Files skipped
- Protected paths
- Manual follow-up instructions

## First Version Behavior

The first implementation should support only:

```bash
npx ai-team-framework update --dry-run
```

Behavior:

1. Read manifest.
2. Validate protected paths.
3. Compare known core files.
4. Write `.ai-team/update-report.md`.
5. Print summary to stdout.
6. Make no changes outside `.ai-team/update-report.md`.

## Later Behavior

After dry-run is stable:

```bash
npx ai-team-framework update --accept-core
```

This may refresh `.ai-team/core/` files after reporting what will change.

## Future Git Integration

The command may eventually support:

```bash
npx ai-team-framework update --commit
```

This should only be allowed when:

- The project is inside a Git repository.
- The working tree is clean before update.
- The update report is generated.
- No protected path is modified.
- The user explicitly passes `--commit`.

Suggested commit message:

```text
chore: update ai-team framework metadata
```

## Open Questions

- Should update support generated application code, or only `.ai-team/core/` metadata?
- Should generator templates expose migration scripts?
- Should update reports include file-level hashes for managed files?
- Should `.ai-team/core/` files include generated headers with ownership metadata?

