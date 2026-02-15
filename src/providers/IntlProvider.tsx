"use client";
import pick from 'lodash/pick';
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";

export function IntlProvider({
  children,
  messages,
  locale
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale?: string;
}) {

  return (
    <NextIntlClientProvider messages={pick(messages, 'ClientCounter')} locale={locale} timeZone="Europe/Istanbul">
      {children}
    </NextIntlClientProvider>
  );
}
