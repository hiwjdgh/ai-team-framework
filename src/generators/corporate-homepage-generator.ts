import fs from "node:fs/promises";
import path from "node:path";
import { copyTemplateDirectory } from "../templates/copy-template.js";
import type { CorporateHomepageSpec } from "../types/project-spec.js";
import { getTemplateRoot } from "../utils/paths.js";

type GenerateResult = {
  outputDir: string;
};

const frameworkVersion = "0.1.0";
const generatorName = "corporate-homepage";
const generatorVersion = "0.1.0";

function toPackageName(projectName: string): string {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "corporate-homepage";
}

async function assertDirectoryIsWritable(outputDir: string): Promise<void> {
  try {
    const entries = await fs.readdir(outputDir);
    if (entries.length > 0) {
      throw new Error(`Output directory already exists and is not empty: ${outputDir}`);
    }
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return;
    }

    throw error;
  }
}

function createAgentPlan(spec: CorporateHomepageSpec): string {
  return `# Agent Plan

## Project Type

${spec.projectType}

## Agents Used

${spec.agents.map((agent) => `- ${agent}`).join("\n")}

## Pages

${spec.pages.map((page) => `- ${page}`).join("\n")}

## Notes

This project was generated from AI Team Framework's corporate homepage generator.
`;
}

function createAiTeamReadme(): string {
  return `# AI Team Metadata

This directory explains how this project was generated and how it should be maintained.

## Directory Policy

- \`core/\` is managed by AI Team Framework.
- \`user/\` is reserved for project-specific notes, overrides, and team decisions.
- Future update commands must not overwrite files in \`user/\`.

## Recommended Reading

1. \`core/project-spec.json\`
2. \`core/architecture.md\`
3. \`core/maintenance.md\`
4. \`user/notes.md\`

## Update Rule

If AI Team Framework updates generated guidance, compare new \`core/\` content before replacing existing files. Keep user-specific context in \`user/\`.
`;
}

function createManifest(spec: CorporateHomepageSpec): string {
  return `${JSON.stringify(
    {
      framework: "ai-team-framework",
      frameworkVersion,
      generator: generatorName,
      generatorVersion,
      projectType: spec.projectType,
      createdAt: new Date().toISOString(),
      managedPaths: [".ai-team/core"],
      protectedPaths: [".ai-team/user"]
    },
    null,
    2
  )}\n`;
}

function createArchitectureDoc(spec: CorporateHomepageSpec): string {
  return `# Architecture

## Summary

This project is a corporate homepage generated with Next.js, React, TypeScript, and Tailwind CSS.

## Project Identity

- Company: ${spec.companyName}
- Industry: ${spec.industry}
- Project type: ${spec.projectType}

## Structure

- \`app/\`: Next.js App Router pages and global styles.
- \`app/page.tsx\`: Homepage.
- \`app/about/page.tsx\`: About page.
- \`app/services/page.tsx\`: Services page.
- \`app/contact/page.tsx\`: Contact page.
- \`components/\`: Shared UI components.
- \`lib/site-config.ts\`: Shared company, navigation, and contact configuration.
- \`tailwind.config.ts\`: Theme tokens and Tailwind content paths.
- \`.ai-team/\`: Generation metadata and maintenance guidance.

## Design System

Tailwind CSS is the required styling system. Shared colors are defined in \`tailwind.config.ts\`.

## Extension Rule

Add new pages under \`app/{route}/page.tsx\`. Add reusable UI under \`components/\`. Keep business and company configuration in \`lib/site-config.ts\`.
`;
}

function createMaintenanceDoc(): string {
  return `# Maintenance

## Common Edits

- Change company name: edit \`lib/site-config.ts\`.
- Change navigation: edit \`lib/site-config.ts\`.
- Change theme colors: edit \`tailwind.config.ts\`.
- Edit homepage content: edit \`app/page.tsx\`.
- Edit about page: edit \`app/about/page.tsx\`.
- Edit services page: edit \`app/services/page.tsx\`.
- Edit contact page: edit \`app/contact/page.tsx\`.
- Edit header: edit \`components/site-header.tsx\`.
- Edit footer: edit \`components/site-footer.tsx\`.

## Safe Customization

Use \`.ai-team/user/\` for project-specific notes and decisions. Do not store custom notes in \`.ai-team/core/\` because future framework updates may provide new core guidance.

## Validation

Run these commands after changes:

\`\`\`bash
npm run build
npm run lint
\`\`\`
`;
}

function createDecisionsDoc(): string {
  return `# Decisions

## Next.js

Next.js is used because it provides a production-oriented React application structure with routing, metadata support, and deployment compatibility.

## Tailwind CSS

Tailwind CSS is required for generated corporate homepage projects so styling remains explicit, portable, and easy to customize without introducing a separate component library.

## Static Corporate Pages

The first generator uses static pages for homepage, about, services, and contact because this is the smallest useful corporate website surface.

## Protected User Notes

User-authored maintenance notes belong in \`.ai-team/user/\`. Framework-managed guidance belongs in \`.ai-team/core/\`.
`;
}

function createChangeGuideDoc(): string {
  return `# Change Guide

## Add A Service Card

Edit \`app/services/page.tsx\` and add an item to the \`serviceItems\` array.

## Add A New Page

1. Create \`app/{route}/page.tsx\`.
2. Add a navigation entry to \`lib/site-config.ts\`.
3. Run \`npm run build\`.

## Change Brand Colors

Edit color values in \`tailwind.config.ts\`, then update affected Tailwind classes if needed.

## Change Contact Details

Edit \`email\` and \`phone\` in \`lib/site-config.ts\`.

## Add Project-Specific Context

Write notes in \`.ai-team/user/notes.md\`. Do not edit \`.ai-team/core/\` for custom business context.
`;
}

function createPromptsDoc(): string {
  return `# Maintenance Prompts

Use these prompts when asking an AI assistant to maintain this project.

## General Update

\`\`\`text
Read .ai-team/README.md, .ai-team/core/project-spec.json, .ai-team/core/architecture.md, and .ai-team/user/notes.md first. Then update the requested page without overwriting .ai-team/user files.
\`\`\`

## Add A Page

\`\`\`text
Add a new Next.js App Router page to this project. Follow .ai-team/core/architecture.md and update lib/site-config.ts only if navigation should include the page.
\`\`\`

## Change Design

\`\`\`text
Update the visual style using Tailwind CSS. Keep theme tokens in tailwind.config.ts and preserve the existing page structure unless a change is required.
\`\`\`
`;
}

function createUserNotesDoc(spec: CorporateHomepageSpec): string {
  return `# User Notes

Use this file for project-specific business context.

## Project

- Company: ${spec.companyName}
- Industry: ${spec.industry}

## Notes

- Add your custom context here.
`;
}

function createUserDecisionsDoc(): string {
  return `# User Decisions

Record project-specific decisions here.

Examples:

- Brand direction
- Content rules
- Deployment target
- Business-specific constraints
`;
}

function createUserMaintenanceDoc(): string {
  return `# User Maintenance

Record team-specific maintenance rules here.

Examples:

- Who owns content updates
- Release process
- Analytics or tracking rules
- SEO review checklist
`;
}

function createUserPromptsDoc(): string {
  return `# User Prompts

Store project-specific AI prompts here.

These prompts should extend the framework guidance in \`.ai-team/core/prompts.md\`.
`;
}

export async function generateCorporateHomepage(
  spec: CorporateHomepageSpec,
  outputDirectory: string
): Promise<GenerateResult> {
  const outputDir = path.resolve(process.cwd(), outputDirectory);
  await assertDirectoryIsWritable(outputDir);

  const templateRoot = getTemplateRoot("corporate-homepage");

  await copyTemplateDirectory(templateRoot, outputDir, {
    PACKAGE_NAME: toPackageName(spec.projectName),
    COMPANY_NAME: spec.companyName,
    INDUSTRY: spec.industry,
    TAGLINE: spec.tagline
  });

  const aiTeamDir = path.join(outputDir, ".ai-team");
  const coreDir = path.join(aiTeamDir, "core");
  const userDir = path.join(aiTeamDir, "user");

  await fs.mkdir(coreDir, { recursive: true });
  await fs.mkdir(userDir, { recursive: true });
  await fs.writeFile(path.join(aiTeamDir, "README.md"), createAiTeamReadme(), "utf8");
  await fs.writeFile(path.join(aiTeamDir, "manifest.json"), createManifest(spec), "utf8");
  await fs.writeFile(
    path.join(coreDir, "project-spec.json"),
    `${JSON.stringify(spec, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(coreDir, "agent-plan.md"), createAgentPlan(spec), "utf8");
  await fs.writeFile(path.join(coreDir, "architecture.md"), createArchitectureDoc(spec), "utf8");
  await fs.writeFile(path.join(coreDir, "maintenance.md"), createMaintenanceDoc(), "utf8");
  await fs.writeFile(path.join(coreDir, "decisions.md"), createDecisionsDoc(), "utf8");
  await fs.writeFile(path.join(coreDir, "change-guide.md"), createChangeGuideDoc(), "utf8");
  await fs.writeFile(path.join(coreDir, "prompts.md"), createPromptsDoc(), "utf8");

  await fs.writeFile(path.join(userDir, "notes.md"), createUserNotesDoc(spec), "utf8");
  await fs.writeFile(path.join(userDir, "decisions.md"), createUserDecisionsDoc(), "utf8");
  await fs.writeFile(path.join(userDir, "maintenance.md"), createUserMaintenanceDoc(), "utf8");
  await fs.writeFile(path.join(userDir, "prompts.md"), createUserPromptsDoc(), "utf8");

  return { outputDir };
}
