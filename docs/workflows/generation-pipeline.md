# Generation Pipeline

## Purpose

This workflow defines how AI Team Framework should generate projects once the CLI exists.

## Pipeline

1. Intake user request.
2. Create project brief.
3. Validate missing requirements.
4. Select agent team.
5. Create architecture plan.
6. Create UX plan.
7. Generate implementation.
8. Integrate full stack.
9. Run validation.
10. Update documentation.
11. Produce final handoff.

## Required Records

Each generation run should update:

- `HISTORY.md`
- `CHANGELOG.md`
- `memory/current-state.md`

## Quality Gates

- Product scope is clear.
- Architecture matches scope.
- Generated code follows coding rules.
- Critical workflows are testable.
- Documentation explains how to run the result.

## Failure Handling

If an agent cannot proceed because information is missing, it must record:

- Missing information
- Why it blocks progress
- Best safe default, if one exists
- User question, if required

