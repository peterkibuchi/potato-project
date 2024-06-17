import { type BoxIcon } from "@radix-ui/react-icons";

export type MainNavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type FooterItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon: typeof BoxIcon;
};
