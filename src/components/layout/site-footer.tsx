import { cn } from "~/lib/utils";
import { Icons } from "../icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} AFRICA-ai-JAPAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
