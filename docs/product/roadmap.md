# Roadmap

## Current Version

The current MVP provides:

- TypeScript CLI skeleton
- `create corporate-homepage` command
- Next.js and Tailwind CSS corporate homepage template
- Generated `.ai-team` metadata with framework-managed `core/` guidance and protected `user/` extensions
- Agent documentation foundation

## Near Term

### Project Specification Validation

Add runtime validation for generated project specs.

### Safe Update Policy

Define update behavior that may refresh `.ai-team/core/` guidance while preserving `.ai-team/user/` content.

Design document: `docs/product/update-command.md`.

### Generator Tests

Add automated tests that verify generated files, metadata, and template rendering.

### CI And Release Workflow

Use GitHub Actions to validate build, type checking, and package contents.

### npm Publish Preparation

Prepare package metadata, release checklist, and publishing verification.

## Mid Term

### Additional Generators

Add project types:

- Admin system
- SaaS starter
- Marketing landing page
- Documentation site
- API service

### Richer CLI Intake

Improve interactive prompts for pages, style direction, sections, language, and deployment target.

### Agent Prompt Compiler

Convert agent Markdown files into structured prompt payloads that future runtime orchestration can use.

## Long Term

### Runtime Agent Orchestration

Coordinate specialized agents during generation instead of using static templates only.

### Template Marketplace

Support community-maintained templates and generator packages.

### Quality Automation

Add generated project linting, formatting, tests, and visual checks where applicable.
