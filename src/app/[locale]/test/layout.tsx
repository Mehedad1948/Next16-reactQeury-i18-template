import React, { Suspense } from "react";

import TestCaller from "../TestCaller";

export default async function Layout({
  children,
  parallel
}: {
  children: React.ReactNode;
  parallel: React.ReactNode;
}) {
  return (
    <section className='flex gap-8 justify-between w-full'>
      <Suspense>
        <TestCaller />
      </Suspense>
      <Suspense>{children}</Suspense>
      <Suspense>{parallel}</Suspense>
    </section>
  );
}
