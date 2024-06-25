type SiteConfig = {
  name: string;
  url: string;
  description: string;
  creator: string;
  authors: { name: string; url: string }[];
  keywords: string[];
  ogImage: string;
  links: {
    github: string;
  };
};

const baseUrl = "https://potato-project-jkuat.vercel.app";

export const siteConfig: SiteConfig = {
  name: "Potato Project",
  url: baseUrl,
  description:
    "Climate-smart potato production and consumption for improved nutrition and better health in Kenya.",
  creator: "Peter Kibuchi",
  authors: [{ name: "Peter Kibuchi", url: "https://github.com/peterkibuchi" }],
  keywords: ["Potato Project"],
  ogImage: `${baseUrl}/og.png`,
  links: {
    github: "https://github.com/peterkibuchi/potato-project",
  },
};
