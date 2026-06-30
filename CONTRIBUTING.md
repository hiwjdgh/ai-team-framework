# Contributing

Thank you for considering a contribution to AI Team Framework.

## Development Setup

```bash
npm install
npm run build
```

## Local CLI Test

```bash
npm run build
node dist/cli.js create corporate-homepage demo-company-site --yes
```

## Contribution Rules

- Read `AGENTS.md` before making changes.
- Keep TypeScript strict mode passing.
- Do not add dependencies without a clear reason.
- Update `HISTORY.md`, `CHANGELOG.md`, and `memory/current-state.md` when behavior changes.
- Keep generated templates runnable.

## Pull Request Checklist

- Build passes.
- Generated project can be created.
- Relevant documentation is updated.
- Open questions or known limitations are documented.

