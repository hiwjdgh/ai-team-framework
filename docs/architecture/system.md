# System Architecture

## Architecture Summary

AI Team Framework is organized around a documentation-driven agent team.

The system has four conceptual layers:

1. User intent
2. Project specification
3. Agent collaboration
4. Generated project output

## Future Runtime Flow

```text
User Request
  -> CLI Intake
  -> Project Specification
  -> Agent Orchestrator
  -> Role Agents
  -> Validation
  -> Generated Project
  -> History And Changelog
```

## Main Components

### CLI

The CLI will collect requirements, select templates, run agents, and write files.

### Project Specification

The project specification is the shared source of truth for generated output. It should include:

- Project type
- Target users
- Features
- Pages or screens
- Data model
- API requirements
- Authentication requirements
- UI style direction
- Deployment target
- Quality requirements

### Agent Orchestrator

The orchestrator assigns tasks to specialized agents, verifies required reading, controls workflow order, and prevents agents from acting outside their scope.

### Specialized Agents

Specialized agents handle product, architecture, design, frontend, backend, quality, documentation, release, and security concerns.

### Validation Layer

Validation checks generated output against requirements, coding rules, architecture rules, and test expectations.

## Repository Structure

```text
memory/
  context.md
  current-state.md
src/
  cli.ts
  commands/
  generators/
  templates/
  types/
  utils/
templates/
  corporate-homepage/
docs/
  product/
    overview.md
  architecture/
    system.md
  rules/
    coding-style.md
    agent-contract.md
  agents/
    README.md
    core/
    delivery/
    quality/
  workflows/
    generation-pipeline.md
  templates/
    project-brief.md
    agent-task.md
CHANGELOG.md
HISTORY.md
LICENSE
package.json
```

## Architectural Rules

- Keep agent responsibilities separated.
- Use documents as contracts between agents.
- Prefer deterministic workflow steps.
- Preserve traceability from requirement to output.
- Do not introduce implementation dependencies until a concrete CLI design requires them.
