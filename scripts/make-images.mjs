// Generates public/og-image.png (1200x630) and public/apple-touch-icon.png from SVG.
import sharp from 'sharp';
import { site } from '../src/config/site.ts';

const mark = (size, r) => `
<rect width="${size}" height="${size}" rx="${r}" fill="#0f766e"/>
<g fill="none" stroke="#fff" stroke-width="${size * 0.075}" stroke-linecap="round" transform="translate(${size * 0.19} ${size * 0.19}) scale(${size * 0.62 / 24})">
  <circle cx="12" cy="12" r="8.5" stroke-width="2.4"/><path d="M12 8v8M8 12h8" stroke-width="2.4"/>
</g>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#f5f8f8"/>
<rect x="60" y="60" width="1080" height="510" rx="28" fill="#ffffff" stroke="#dce5e5" stroke-width="2"/>
<g transform="translate(110 110)">${mark(72, 20)}</g>
<text x="206" y="162" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="#0e1e1f">${site.name}</text>
<text x="110" y="330" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="78" font-weight="800" letter-spacing="-2" fill="#0e1e1f">Every taka collected.</text>
<text x="110" y="420" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="78" font-weight="800" letter-spacing="-2" fill="#0f766e">Every taka accounted for.</text>
<text x="110" y="500" font-family="Manrope, Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#4f6567">Offline-first donations and expenses for community committees</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile('public/og-image.png');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">${mark(180, 0)}</svg>`;
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png');
console.log('images written');
