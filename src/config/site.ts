import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { siteConfig } from "~/config";
import type { MarketingConfig, NavItem } from "~/types";

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

export const navItems: NavItem[] = [
  {
    title: "GitHub",
    href: siteConfig.links.github,
    icon: GitHubLogoIcon,
  },
];
