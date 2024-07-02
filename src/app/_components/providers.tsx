"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MessagesProvider } from "~/context/messages";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MessagesProvider>{children}</MessagesProvider>
    </QueryClientProvider>
  );
}
