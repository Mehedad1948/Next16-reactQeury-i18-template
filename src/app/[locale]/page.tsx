import { Dashboard, FeaturesList, Showcase } from "@/widgets";
import { setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { routing } from "@/i18n/routing";


export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale


  return (
    <section className="flex flex-col items-center justify-center pb-40">
      <Suspense>
        <Dashboard locale={locale} />
      </Suspense>
      <Suspense>
        <FeaturesList locale={locale} />
      </Suspense>
      <Suspense>

        <Showcase />
      </Suspense>
    </section>
  );
}
