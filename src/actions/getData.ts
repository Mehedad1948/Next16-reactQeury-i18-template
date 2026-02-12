import { cacheLife, cacheTag } from 'next/cache';

export async function getData() {
  "use cache";
    // cacheLife('hours')
cacheTag('test')
  const res = await fetch("http://localhost:3001", {  next: {tags: ['fetch-tag']} } );
  const data = await res.json();
  return data;
}
