import Link from "next/link";

import { MainNav } from "~/components/layout/main-nav";
import { SiteFooter } from "~/components/layout/site-footer";
import { ModeToggle } from "~/components/mode-toggle";
import { buttonVariants } from "~/components/ui/button";
import { marketingConfig, navItems } from "~/config/site";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav className="flex items-center">
            <div className="ml-auto text-sm text-primary">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className={buttonVariants({ variant: "ghost" })}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.title}</span>
                </Link>
              ))}
            </div>

            <ModeToggle />
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}
