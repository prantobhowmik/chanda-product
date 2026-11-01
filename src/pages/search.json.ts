import type { APIRoute } from 'astro';
import { getDocs, docHref } from '../lib/docs';

const plain = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|]/g, ' ')
    .replace(/^\s*[-\d.]+\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim();

export const GET: APIRoute = async () => {
  const docs = await getDocs();
  const index = docs.map((d) => ({
    title: d.data.title,
    description: d.data.description,
    url: docHref(d),
    group: d.data.group,
    headings: (d.body ?? '')
      .split('\n')
      .filter((l) => /^#{2,3}\s/.test(l))
      .map((l) => l.replace(/^#+\s+/, ''))
      .join(' | '),
    text: plain(d.body ?? ''),
  }));
  return new Response(JSON.stringify(index), { headers: { 'Content-Type': 'application/json' } });
};
