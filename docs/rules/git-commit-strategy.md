# Git Commit Strategy

## Purpose

This project uses a simple Conventional Commits strategy so changes can be reviewed, released, and later automated safely.

## Commit Message Format

```text
type: short description
```

Examples:

```text
feat: add corporate homepage generator
fix: preserve user ai-team metadata
docs: add release process
ci: add npm publish workflow
chore: update package metadata
refactor: split metadata writer
test: add generator output tests
```

## Commit Types

- `feat`: User-facing feature or generator capability.
- `fix`: Bug fix.
- `docs`: Documentation-only change.
- `ci`: GitHub Actions or release automation.
- `chore`: Build, package, dependency, or maintenance task.
- `refactor`: Internal code structure change without intended behavior change.
- `test`: Test addition or test maintenance.

## Branch Strategy

Use `main` as the stable release branch.

Recommended branch names:

```text
feature/{short-name}
fix/{short-name}
docs/{short-name}
ci/{short-name}
```

Examples:

```text
feature/ai-team-metadata
fix/template-copy-paths
docs/release-process
ci/npm-publish
```

## Release Relationship

Commits should make release intent clear:

- `fix` usually maps to a patch release.
- `feat` usually maps to a minor release.
- Breaking changes require a major release and must be clearly documented.

## Recommended Local Flow

```bash
npm run build
npm run check
npm pack --dry-run
git add .
git commit -m "feat: describe the change"
git push
```

## Automation Policy

The first release automation should be manually triggered from GitHub Actions.

Do not automatically publish to npm on every push to `main` until the generator contracts are stable.

