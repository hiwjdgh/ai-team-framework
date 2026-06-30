# Release Process

## Purpose

This document defines the release checklist for publishing AI Team Framework to npm.

## Pre-Release Checklist

1. Confirm the working tree only contains intended changes.
2. Run validation:

```bash
npm ci
npm run build
npm run check
npm pack --dry-run
```

3. Create a sample project:

```bash
node dist/cli.js create corporate-homepage generated/release-check --company "Release Check" --yes
```

4. Confirm generated project files include:

- `package.json`
- `app/`
- `components/`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.ai-team/project-spec.json`

5. Update:

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

