import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { build } from 'esbuild';
import { svelteClient } from './svelte-build.mjs';
import { site } from '../src/content.mjs';
import { pages } from '../src/views.mjs';
import { layout } from '../src/layout.mjs';
import { securityHeaders } from '../src/security.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const isPreview = process.env.QALYON_PUBLIC_BUILD !== '1';
const origin = isPreview ? site.previewOrigin : process.env.QALYON_SITE_ORIGIN;
if (!origin || !/^https:\/\/[a-z0-9.-]+$/i.test(origin)) {
  throw new Error('Configure QALYON_SITE_ORIGIN com a origem HTTPS confirmada, sem barra final.');
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'src/assets'), join(dist, 'assets'), { recursive: true });
await build({
  entryPoints: {
    'ecosystem-scene': join(root, 'src/scenes/ecosystem.js'),
    'work-stage': join(root, 'src/scenes/work-stage.js'),
  },
  outdir: join(dist, 'assets'),
  bundle: true,
  conditions: ['svelte'],
  external: ['/assets/ecosystem/*'],
  plugins: [svelteClient],
  minify: true,
  format: 'esm',
});

for (const page of pages) {
  const dir = join(dist, page.path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), layout(page, origin, isPreview));
}

await writeFile(join(dist, 'privacidade.html'), layout({
  path: '/privacidade/',
  title: 'Privacidade — Endereço atualizado',
  description: 'O aviso de privacidade da Qalyon tem um novo endereço.',
  styles: ['information-page.css'],
  body: '<section class="information-hero"><div class="wrap"><h1>Aviso de privacidade</h1><p><a class="arrow-link" href="/privacidade/">Acessar o aviso atualizado</a></p></div></section>',
}, origin, true));

await writeFile(join(dist, '404.html'), layout({
  path: '/404.html',
  indexable: false,
  title: 'Página não encontrada — Qalyon',
  description: 'Encontre o caminho de volta para o site da Qalyon.',
  styles: ['information-page.css'],
  body: '<section class="information-hero"><div class="wrap"><h1>Página não encontrada</h1><p class="lead">O endereço pode ter mudado.</p><div class="actions"><a class="button" href="/">Voltar ao início</a><a class="arrow-link" href="/contato/">Falar com a Qalyon</a></div></div></section>',
}, origin, isPreview));

if (!isPreview) {
  const sitemap = pages.filter(page => page.indexable !== false)
    .map(page => `  <url><loc>${origin + page.path}</loc></url>`).join('\n');
  await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemap}\n</urlset>\n`);
}
await writeFile(join(dist, 'robots.txt'), isPreview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);

const headers = isPreview ? { ...securityHeaders, 'X-Robots-Tag': 'noindex, nofollow' } : securityHeaders;
const rules = Object.entries(headers).map(([name, value]) => `  ${name}: ${value}`).join('\n');
await writeFile(join(dist, '_headers'), `/*\n${rules}\n/assets/*\n  Cache-Control: public, max-age=86400\n`);
console.log(`${pages.length} páginas geradas (${isPreview ? 'prévia' : 'produção'}).`);
