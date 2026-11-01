// Checks internal links and #fragments in the built site (dist/). Run after `npm run build`.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const dist = 'dist';
if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = walk(dist);
const pages = files.filter((f) => f.endsWith('.html'));
const ids = new Map();
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  ids.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

const resolve = (path) => {
  const clean = path === '/' ? '/index' : path.replace(/\/$/, '');
  const candidates = [join(dist, clean), join(dist, `${clean}.html`), join(dist, clean, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
};

let broken = 0;
let checked = 0;
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const [pathPart, hash] = href.split('#');
    const target = pathPart ? resolve(pathPart) : f;
    checked++;
    if (!target) {
      console.error(`BROKEN  ${f.replace('dist', '')} -> ${href}`);
      broken++;
      continue;
    }
    if (hash && extname(target) === '.html' && !ids.get(target)?.has(hash)) {
      console.error(`MISSING ANCHOR  ${f.replace('dist', '')} -> ${href}`);
      broken++;
    }
  }
}
console.log(`${checked} internal links checked in ${pages.length} pages, ${broken} broken.`);
process.exit(broken ? 1 : 0);
