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
- Generated project metadata in `.ai-team/`

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
