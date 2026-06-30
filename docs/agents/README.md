# Agent Team

## Purpose

This directory defines the AI agent team used by AI Team Framework.

Each agent is a role contract. Future CLI implementation can load these Markdown files as system or task instructions when generating projects.

## Required Agent Reading

Before working, every agent must read:

1. `memory/context.md`
2. `docs/product/overview.md`
3. `docs/architecture/system.md`
4. `docs/rules/coding-style.md`
5. `docs/rules/agent-contract.md`

## Agent Groups

### Core

- Orchestrator Agent
- Product Agent
- Architecture Agent

### Delivery

- UX Agent
- Frontend Agent
- Backend Agent
- Fullstack Integrator Agent
- Documentation Agent

### Quality

- QA Agent
- Security Agent
- Release Agent

## Collaboration Rule

The orchestrator owns sequencing. Specialized agents own domain-specific output. No specialized agent should override another agent's domain without a handoff or explicit task instruction.

