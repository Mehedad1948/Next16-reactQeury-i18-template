import { Suspense } from "react";
import { connection } from "next/server";

import TestCaller from "../../TestCaller";

export default async function page() {
  await connection();
  return (
    <div>
      <Suspense>
        <TestCaller />
      </Suspense>
      Parallel
    </div>
  );
}
