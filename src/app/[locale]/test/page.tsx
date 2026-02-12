"use cache";

import { Suspense } from "react";
import { cacheLife } from "next/cache";

import TestCaller from "../TestCaller";
import ModalExample from "./modalButton";

export default async function TestPage() {
  cacheLife("days");
  return (
    <div className="h-screen w-fit bg-gray-400">
      <Suspense>
        <TestCaller />
      </Suspense>
      <ModalExample />
    </div>
  );
}
