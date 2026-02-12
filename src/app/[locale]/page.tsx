'use cache'

import { Suspense } from "react";

import { Dashboard, FeaturesList, Showcase } from "@/widgets";

import ClientRandom from "./ClientRandom";
import TestCaller from "./TestCaller";
import { setRequestLocale } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale;


  return (
    <section className="flex flex-col items-center justify-center pb-40">
      <div className="rounded-xl bg-orange-300 p-6">
        <Suspense>
          <ClientRandom />
        </Suspense>
      </div>
      <Suspense>
        <TestCaller />
      </Suspense>
      <Suspense>
        <Dashboard locale={locale} />
      </Suspense>
      <Suspense>
        <TestCaller />
      </Suspense>
      <Suspense>
        <FeaturesList locale={locale} />
      </Suspense>
      {/* <Suspense
        fallback={<div className="flex h-96 w-full items-center justify-center">loading..</div>}
      >
        <Showcase />
      </Suspense> */}
    </section>
  );
}
