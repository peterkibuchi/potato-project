import { type Viewport } from "next";
import { GeistSans } from "geist/font/sans";

import "~/styles/globals.css";

import { Chat } from "~/components/chatbot/chat";
import { cn, constructMetadata } from "~/lib/utils";
import { Analytics } from "./_components/analytics";
import { Providers } from "./_components/providers";
import { TailwindIndicator } from "./_components/tailwind-indicator";
import { ThemeProvider } from "./_components/theme-provider";

export const metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <main className="flex-1">
              <Chat />
              {children}
            </main>
          </Providers>

          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
