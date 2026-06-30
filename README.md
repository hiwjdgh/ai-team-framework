# AI Team Framework

AI Team Framework is a documentation-first project for building a coordinated AI agent team that can eventually generate applications, homepages, admin systems, APIs, and related software artifacts through an `npx` command.

## Current Focus

The project is currently defining:

- Agent roles
- Collaboration rules
- Product direction
- Architecture direction
- Coding standards
- Generation workflow
- Reusable task templates

It also includes the first executable CLI skeleton and a Next.js + Tailwind CSS corporate homepage generator.

## CLI Usage

After installing dependencies and building locally:

```bash
npm install
npm run build
node dist/cli.js create corporate-homepage demo-company-site --yes
```

Future npm usage:

```bash
npx ai-team-framework create corporate-homepage
```

The CLI collects project requirements, creates a structured project spec, applies the relevant generator, and writes project metadata into `.ai-team/`.

## Document Map

- `AGENTS.md`: Repository-level AI agent instructions.
- `memory/context.md`: Project context and required reading order.
- `memory/current-state.md`: Current state of the project.
- `docs/product/overview.md`: Product vision and scope.
- `docs/product/cli-mvp.md`: First CLI command and generator scope.
- `docs/architecture/system.md`: System architecture.
- `docs/rules/coding-style.md`: Coding rules.
- `docs/rules/agent-contract.md`: Shared agent behavior contract.
- `docs/agents/README.md`: Agent team overview.
- `docs/workflows/generation-pipeline.md`: Project generation workflow.
- `docs/templates/project-brief.md`: Project brief template.
- `docs/templates/agent-task.md`: Agent task template.

## Agent Groups

- Core agents define scope, orchestration, and architecture.
- Delivery agents produce UX, frontend, backend, integration, and documentation output.
- Quality agents verify QA, security, and release readiness.
