export type ProjectType = "corporate-homepage";

export type CorporateHomepageSpec = {
  projectType: ProjectType;
  projectName: string;
  companyName: string;
  industry: string;
  tagline: string;
  pages: string[];
  agents: string[];
};

