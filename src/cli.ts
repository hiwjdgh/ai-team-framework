#!/usr/bin/env node

import { createCommand } from "./commands/create.js";

type CliResult = {
  exitCode: number;
};

function printHelp(): void {
  console.log(`
AI Team Framework

Usage:
  ai-team-framework create corporate-homepage [project-name] [options]

Options:
  --company <name>       Company display name
  --industry <name>      Company industry
  --tagline <text>       Main homepage tagline
  --out <directory>      Output directory
  --yes                  Use safe defaults for missing values
  --help                 Show help

Examples:
  ai-team-framework create corporate-homepage acme-site --company "Acme Labs"
  npx ai-team-framework create corporate-homepage
`);
}

async function main(argv: string[]): Promise<CliResult> {
  const [command, target, ...args] = argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return { exitCode: 0 };
  }

  if (command === "create") {
    return createCommand(target, args);
  }

  console.error(`Unknown command: ${command}`);
  printHelp();
  return { exitCode: 1 };
}

main(process.argv.slice(2))
  .then((result) => {
    process.exitCode = result.exitCode;
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    process.exitCode = 1;
  });

