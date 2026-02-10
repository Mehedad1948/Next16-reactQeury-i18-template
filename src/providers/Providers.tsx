"use client";

import { type AbstractIntlMessages } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { IntlProvider, QueryProvider, ThemeProvider } from "@/providers";

import { ModalProvider } from "./modal-provider";

export function Providers({
  children,
  messages,
  locale
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale?: string;
}) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <IntlProvider messages={messages} locale={locale}>
          <QueryProvider>
            <ModalProvider />
            {children}
          </QueryProvider>
        </IntlProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
