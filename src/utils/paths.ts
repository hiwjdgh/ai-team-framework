import path from "node:path";
import { fileURLToPath } from "node:url";

export function getPackageRoot(): string {
  const currentFile = fileURLToPath(import.meta.url);
  return path.resolve(path.dirname(currentFile), "..");
}

export function getTemplateRoot(templateName: string): string {
  return path.resolve(getPackageRoot(), "..", "templates", templateName);
}

