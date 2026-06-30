import fs from "node:fs/promises";
import path from "node:path";

export type TemplateVariables = Record<string, string>;

function renderTemplate(value: string, variables: TemplateVariables): string {
  return value.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key: string) => {
    return variables[key] ?? "";
  });
}

function resolveOutputFileName(fileName: string): string {
  return fileName.endsWith(".tmpl") ? fileName.slice(0, -5) : fileName;
}

export async function copyTemplateDirectory(
  sourceDir: string,
  targetDir: string,
  variables: TemplateVariables
): Promise<void> {
  await fs.mkdir(targetDir, { recursive: true });

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, resolveOutputFileName(entry.name));

    if (entry.isDirectory()) {
      await copyTemplateDirectory(sourcePath, targetPath, variables);
      continue;
    }

    const raw = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(targetPath, renderTemplate(raw, variables), "utf8");
  }
}

