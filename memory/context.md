# Project Context

## Project Name

AI Team Framework

## Purpose

AI Team Framework is a documentation-first framework for composing AI agents that can generate complete software systems through an `npx` command.

The long-term target is to generate multiple product types from structured instructions, including:

- Applications
- Marketing websites
- Admin systems
- Internal tools
- API services
- Design systems
- Documentation packages

## Current Stage

This repository is in the CLI MVP stage.

The project now includes the first executable TypeScript CLI skeleton and a corporate homepage generator.

The current priority is to keep the CLI small, verifiable, and easy to extend with additional project generators.

## Core Principle

Agents must not guess.

Every agent must:

- Read required project documents before acting.
- Analyze existing context before producing output.
- Produce reusable and structured artifacts.
- Keep outputs compatible with TypeScript strict mode when code generation is involved.
- Avoid adding unnecessary libraries.

## Required Reading Order

Every agent must read these files first:

1. `memory/context.md`
2. `docs/product/overview.md`
3. `docs/architecture/system.md`
4. `docs/rules/coding-style.md`

## Change Log Notes

Initial documentation structure was created to define the future AI agent team.
The first CLI MVP and corporate homepage generator were added.
