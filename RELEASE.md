# Release Process

## Purpose

This document defines the release checklist for publishing AI Team Framework to npm.

## Pre-Release Checklist

1. Confirm the working tree only contains intended changes.
2. Confirm commit history follows `docs/rules/git-commit-strategy.md`.
3. Run validation:

```bash
npm ci
npm run build
npm run check
npm pack --dry-run
```

4. Create a sample project:

```bash
node dist/cli.js create corporate-homepage generated/release-check --company "Release Check" --yes
```

5. Confirm generated project files include:

- `package.json`
- `app/`
- `components/`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.ai-team/manifest.json`
- `.ai-team/core/project-spec.json`
- `.ai-team/core/maintenance.md`
- `.ai-team/user/notes.md`

6. Update:

- `CHANGELOG.md`
- `HISTORY.md`
- `memory/current-state.md`
- `package.json` version

## npm Login

```bash
npm login
npm whoami
```

## Publish Dry Run

```bash
npm publish --dry-run
```

## Publish

```bash
npm publish --access public
```

## GitHub Actions Publish

The repository includes a manual publish workflow:

```text
Actions -> Publish to npm -> Run workflow
```

Inputs:

- `version`: `patch`, `minor`, or `major`
- `dry_run`: `true` for validation only, `false` for real publish

Required repository secret:

```text
NPM_TOKEN
```

Recommended flow:

1. Run with `dry_run: true`.
2. Confirm the workflow passes.
3. Run with `dry_run: false`.
4. Verify npm package installation with `npx`.

## Post-Release Verification

After npm publish, verify the package from a clean directory:

```bash
npx ai-team-framework create corporate-homepage my-company-site --yes
```

Then run the generated project:

```bash
cd my-company-site
npm install
npm run dev
```

## Versioning

Use semantic versioning:

- Patch: bug fixes and documentation corrections.
- Minor: new generators or backward-compatible CLI features.
- Major: breaking CLI or generator contract changes.

## Commit Strategy

Use Conventional Commits. See `docs/rules/git-commit-strategy.md`.
