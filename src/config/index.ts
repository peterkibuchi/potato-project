import { getBaseUrl } from "~/lib/utils";

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

export const siteConfig: SiteConfig = {
  name: "Potato Project",
  url: getBaseUrl(),
  description:
    "Climate-smart potato production and consumption for improved nutrition and better health in Kenya.",
  creator: "Peter Kibuchi",
  authors: [{ name: "Peter Kibuchi", url: "https://github.com/peterkibuchi" }],
  keywords: ["Potato Project"],
  ogImage: `${getBaseUrl()}/og.png`,
  links: {
    github: "https://github.com/peterkibuchi/potato-project",
  },
};
