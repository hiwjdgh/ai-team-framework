# Coding Style

## Scope

These rules apply to future generated code and framework implementation code.

## TypeScript

- Use TypeScript strict mode.
- Avoid `any` unless a boundary requires it and the reason is documented.
- Prefer explicit domain types over loose object shapes.
- Keep public function signatures clear and stable.
- Use discriminated unions for variant states.

## Code Organization

- Prefer small modules with clear ownership.
- Keep business rules outside UI components when practical.
- Reuse existing utilities before creating new ones.
- Do not create abstractions until repeated complexity exists.
- Avoid unnecessary dependencies.

## Naming

- Use descriptive names.
- Avoid abbreviations unless they are common in the domain.
- Name files by responsibility.
- Name components by visible product concept or reusable UI role.

## Frontend

- Build actual usable screens, not placeholder landing pages.
- Keep layouts responsive.
- Prefer accessible controls.
- Avoid UI text that explains implementation details.
- Keep visual style aligned with the generated product domain.

## Backend

- Validate external input.
- Keep API contracts explicit.
- Separate transport, application, and persistence concerns when the project size justifies it.
- Do not hide errors that should be visible during development.

## Testing

- Add tests where behavior can regress.
- Prioritize shared logic, data transformations, API contracts, and critical user flows.
- Keep tests focused and readable.

