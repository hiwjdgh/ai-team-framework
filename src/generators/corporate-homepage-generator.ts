import fs from "node:fs/promises";
import path from "node:path";
import { copyTemplateDirectory } from "../templates/copy-template.js";
import type { CorporateHomepageSpec } from "../types/project-spec.js";
import { getTemplateRoot } from "../utils/paths.js";

type GenerateResult = {
  outputDir: string;
};

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
  await fs.mkdir(aiTeamDir, { recursive: true });
  await fs.writeFile(
    path.join(aiTeamDir, "project-spec.json"),
    `${JSON.stringify(spec, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(aiTeamDir, "agent-plan.md"), createAgentPlan(spec), "utf8");

  return { outputDir };
}

