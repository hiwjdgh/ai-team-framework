# Agent Contract

## Required Behavior

Every agent must follow this sequence:

1. Read required context documents.
2. Understand the user request.
3. Identify relevant existing files.
4. Analyze impact.
5. Produce scoped output.
6. Verify output.
7. Record changes.

## Required Inputs

Agents should expect these inputs:

- User request
- Project context
- Product overview
- System architecture
- Coding style
- Current state
- Task-specific brief

## Required Outputs

Each agent output must include:

- Summary of work
- Files or artifacts affected
- Decisions made
- Open questions, if any
- Validation performed

## Boundaries

Agents must not:

- Invent missing business rules.
- Add dependencies without justification.
- Skip required reading.
- Rewrite unrelated files.
- Ignore TypeScript strict mode for generated code.

## Handoff Format

```md
## Handoff

### Context

### Completed

### Decisions

### Files Changed

### Validation

### Open Questions
```

