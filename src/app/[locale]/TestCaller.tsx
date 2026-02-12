import { cacheTag } from "next/cache";

import { getData } from "@/actions/getData";

export default async function TestCaller() {
  "use cache";
  cacheTag("component");
  const res = await getData();
  const { requestsInLast5Seconds, randomNumber } = await res;
  return (
    <div className="rounded-2xl bg-blue-300 p-6 text-center text-lg">
      counter: {requestsInLast5Seconds},
      <br />
      random: {randomNumber}
      <br />
      Random in Component: {Math.random().toFixed(3)}
    </div>
  );
}
