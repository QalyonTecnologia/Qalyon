import { escape, icon } from './components.mjs';
import { site } from './content.mjs';
import { contentSecurityPolicy, referrerPolicy } from './security.mjs';

export function layout(page, origin, isPreview) {
  const active = path => page.path.startsWith(path) ? ' aria-current="' + (page.path === path ? 'page' : 'location') + '"' : '';
  const logo = `<a class="brand" href="/" aria-label="Qalyon, início"><img src="/assets/logo.webp" width="600" height="190" alt=""></a>`;
  const indexable = !isPreview && page.indexable !== false;
  const socialImage = origin + '/assets/social.png';
  return `<!doctype html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0E1317">
  <meta http-equiv="Content-Security-Policy" content="${contentSecurityPolicy}">
  <meta name="referrer" content="${referrerPolicy}">
  <meta name="robots" content="${indexable ? 'index,follow' : 'noindex,nofollow'}">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  ${indexable ? `<link rel="canonical" href="${origin + page.path}">` : ''}
  <meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Qalyon"><meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${origin + page.path}">
  <meta property="og:image" content="${socialImage}"><meta property="og:image:alt" content="Logotipo Qalyon Tecnologia">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-symbol.png"><link rel="stylesheet" href="/assets/tokens.css">
  <link rel="stylesheet" href="/assets/styles.css?v=2">
  ${(page.styles ?? []).map(file => `<link rel="stylesheet" href="/assets/${file}">`).join('\n  ')}
  <script type="module" src="/assets/motion.js"></script>
  ${(page.modules ?? []).map(file => `<script type="module" src="/assets/${file}"></script>`).join('\n  ')}
  ${page.script ? `<script src="/assets/${page.script}" defer></script>` : ''}
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="header"><div class="wrap header-inner">${logo}
<nav aria-label="Navegação principal">${site.navigation.map(([path, label]) =>
  `<a href="${path}"${active(path)}>${label}</a>`).join('')}</nav>
<a class="button header-cta" href="/contato/">Solicitar orçamento</a></div></header>
<main id="conteudo" tabindex="-1">${page.body}</main>
<footer class="footer"><div class="wrap footer-inner">
  <div class="footer-brand">${logo}<p>${site.slogan}</p></div>
${page.path === '/' ? '' : '<button type="button" class="motion-toggle footer-motion" id="motion-toggle" hidden>Pausar movimento</button>'}
<nav class="footer-links" aria-label="Informações do site">
  <a href="/privacidade/"${active('/privacidade/')}>Privacidade</a>
  <a href="/termos/"${active('/termos/')}>Uso do site</a>
  <a class="footer-accessibility" href="/acessibilidade/"${active('/acessibilidade/')}>${icon('M24 5a3 3 0 1 0 0 6 3 3 0 1 0 0-6ZM12 15l12 3 12-3M24 18v10l-7 12m7-12 7 12')} Acessibilidade</a>
</nav><span>© ${new Date().getUTCFullYear()} Qalyon</span></div></footer>
</body></html>`;
}
