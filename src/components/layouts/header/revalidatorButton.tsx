"use client";

import { revalidateCustomTag, updateCustomTag } from "@/actions/user";

export default function RevalidatorButton({ tag = "test" }: { tag?: string }) {
  return <button onClick={() => revalidateCustomTag(tag)}>revalidate</button>;
}

export function UpdateButton({ tag = "test" }: { tag?: string }) {
  return <button onClick={() => updateCustomTag(tag)}>Update</button>;
}
