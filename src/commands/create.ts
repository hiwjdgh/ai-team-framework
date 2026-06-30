import { createInterface } from "node:readline/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { generateCorporateHomepage } from "../generators/corporate-homepage-generator.js";
import type { CorporateHomepageSpec } from "../types/project-spec.js";

type ParsedOptions = {
  projectName?: string;
  company?: string;
  industry?: string;
  tagline?: string;
  out?: string;
  yes: boolean;
};

type CliResult = {
  exitCode: number;
};

function parseOptions(args: string[]): ParsedOptions {
  const options: ParsedOptions = {
    yes: false
  };

  const positional: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--yes" || arg === "-y") {
      options.yes = true;
      continue;
    }

    if (arg === "--company") {
      options.company = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--industry") {
      options.industry = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--tagline") {
      options.tagline = args[index + 1];
      index += 1;
      continue;
    }

    if (arg === "--out") {
      options.out = args[index + 1];
      index += 1;
      continue;
    }

    positional.push(arg);
  }

  options.projectName = positional[0];
  return options;
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProjectName(value: string): string {
  return path.basename(value.replace(/\\/g, "/")) || value;
}

async function askForMissingOptions(options: ParsedOptions): Promise<Required<ParsedOptions>> {
  if (options.yes) {
    const projectName = options.projectName ?? "corporate-homepage";
    return {
      projectName,
      company: options.company ?? "Acme Company",
      industry: options.industry ?? "Professional Services",
      tagline: options.tagline ?? "Trusted solutions for growing teams.",
      out: options.out ?? projectName,
      yes: true
    };
  }

  const rl = createInterface({ input, output });

  try {
    const company = options.company ?? await rl.question("Company name: ");
    const defaultProjectName = slugify(company || "corporate-homepage") || "corporate-homepage";
    const projectName = options.projectName ?? await rl.question(`Project directory (${defaultProjectName}): `);
    const industry = options.industry ?? await rl.question("Industry (Professional Services): ");
    const tagline = options.tagline ?? await rl.question("Tagline (Trusted solutions for growing teams.): ");

    const resolvedProjectName = projectName.trim() || defaultProjectName;

    return {
      projectName: resolvedProjectName,
      company: company.trim() || "Acme Company",
      industry: industry.trim() || "Professional Services",
      tagline: tagline.trim() || "Trusted solutions for growing teams.",
      out: options.out ?? resolvedProjectName,
      yes: false
    };
  } finally {
    rl.close();
  }
}

function buildSpec(options: Required<ParsedOptions>): CorporateHomepageSpec {
  return {
    projectType: "corporate-homepage",
    projectName: getProjectName(options.projectName),
    companyName: options.company,
    industry: options.industry,
    tagline: options.tagline,
    pages: ["home", "about", "services", "contact"],
    agents: [
      "product-agent",
      "ux-agent",
      "architecture-agent",
      "frontend-agent",
      "qa-agent",
      "documentation-agent",
      "release-agent"
    ]
  };
}

export async function createCommand(target: string | undefined, args: string[]): Promise<CliResult> {
  if (!target) {
    console.error("Missing project type. Supported type: corporate-homepage");
    return { exitCode: 1 };
  }

  if (target !== "corporate-homepage") {
    console.error(`Unsupported project type: ${target}`);
    console.error("Supported type: corporate-homepage");
    return { exitCode: 1 };
  }

  const options = await askForMissingOptions(parseOptions(args));
  const spec = buildSpec(options);
  const result = await generateCorporateHomepage(spec, options.out);

  console.log(`Created ${spec.companyName} corporate homepage at ${result.outputDir}`);
  console.log("Next steps:");
  console.log(`  cd ${result.outputDir}`);
  console.log("  npm install");
  console.log("  npm run dev");

  return { exitCode: 0 };
}
