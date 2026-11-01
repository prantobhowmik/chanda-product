import { getCollection, type CollectionEntry } from 'astro:content';

export type Doc = CollectionEntry<'docs'>;

const groupOrder = ['Start', 'Teams', 'More'] as const;

export async function getDocs(): Promise<Doc[]> {
  const docs = await getCollection('docs');
  return docs.sort((a, b) => a.data.order - b.data.order);
}

export function groupDocs(docs: Doc[]) {
  return groupOrder
    .map((group) => ({ group, items: docs.filter((d) => d.data.group === group) }))
    .filter((g) => g.items.length > 0);
}

export const docHref = (d: Doc) => `/docs/${d.id}`;
