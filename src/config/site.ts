import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { siteConfig } from "~/config";
import type { FooterItem, MarketingConfig } from "~/types";

export const marketingConfig: MarketingConfig = {
  mainNav: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Articles",
      href: "/articles",
    },
  ],
};

export const footerItems: FooterItem[] = [
  {
    title: "GitHub",
    href: siteConfig.links.github,
    icon: GitHubLogoIcon,
  },
];
