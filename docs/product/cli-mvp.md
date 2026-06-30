# CLI MVP

## Goal

Provide the first executable version of AI Team Framework.

## Command

```bash
ai-team-framework create corporate-homepage
```

Future npm usage:

```bash
npx ai-team-framework create corporate-homepage
```

## MVP Output

The first generator creates a Next.js and Tailwind CSS corporate homepage with:

- Home page
- About page
- Services page
- Contact page
- Shared layout
- Shared navigation and footer
- Tailwind CSS configuration
- Generated project metadata and maintenance guidance in `.ai-team/`

## Generated AI Team Structure

```text
.ai-team/
  README.md
  manifest.json
  core/
    project-spec.json
    agent-plan.md
    architecture.md
    maintenance.md
    decisions.md
    change-guide.md
    prompts.md
  user/
    notes.md
    decisions.md
    maintenance.md
    prompts.md
```

The `core/` directory is framework-managed. The `user/` directory is protected for user-authored extensions and must not be overwritten by future update commands.

## Current Options

```bash
ai-team-framework create corporate-homepage [project-name] [options]
```

Options:

- `--company <name>`
- `--industry <name>`
- `--tagline <text>`
- `--out <directory>`
- `--yes`

## Next CLI Work

- Add project specification schema validation.
- Add more project types.
- Add generator tests.
- Add package publishing workflow.
- Add richer interactive intake.
