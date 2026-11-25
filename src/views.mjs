import { servicesCatalog, servicesHeroArtwork, serviceVisuals } from './services-catalog.mjs';
import { workGallery } from './work-gallery.mjs';
import { landingDemos } from './landing-demos.mjs';
import { institutionalDemos } from './institutional-demos.mjs';
import { portfolioDemos } from './portfolio-demos.mjs';
import { site, contact, services, products, projects, process } from './content.mjs';

const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

const heading = (label, title, description = '') => `
  <p class="label">${label}</p><h1>${title}</h1>
  ${description ? `<p class="lead">${description}</p>` : ''}`;
const link = (href, label, primary = false) =>
  `<a class="${primary ? 'button' : 'arrow-link'}" href="${escape(href)}">${label}<span aria-hidden="true">↗</span></a>`;
const quote = (slug = '') =>
  link(slug ? '/contato/?servico=' + encodeURIComponent(slug) : '/contato/', 'Solicitar orçamento', true);
const servicePath = service => `/servicos/${service.slug}/`;
const projectPath = project => `/projetos/${project.slug}/`;
const productPath = product => `/produtos/${product.slug}/`;

const brandSymbol = '<img class="brand-symbol" src="/assets/qalyon-symbol.webp" width="99" height="104" alt="">';

const projectPreview = project => {
  if (project.service === 'sites-institucionais') {
    return `<div class="project-preview preview-institutional" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-institutional-body">
          <div><span>ALMEIDA TORRES</span><strong>O Direito em perspectiva.</strong><small>Áreas de atuação ↗</small></div>
          <img src="/assets/almeida-torres.webp" alt="" width="600" height="343" loading="lazy" decoding="async">
        </div>
      </div>
    </div>`;
  }
  if (project.service === 'landing-pages') {
    return `<div class="project-preview preview-landing" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-landing-body"><span>CASA EM DIA</span><strong>Seu espaço, bem cuidado.</strong>
          <small>Pedir orçamento ↗</small></div>
        <div class="preview-landing-shape"></div>
      </div>
    </div>`;
  }
  if (project.service === 'sistemas-web') {
    return `<div class="project-preview preview-system" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-system-body"><span>ORDENS DE SERVIÇO</span><strong>Visão da operação</strong>
          <div><i></i> Agendar <b>OS-101</b></div>
          <div><i></i> Em execução <b>OS-102</b></div>
          <div><i></i> Concluído <b>OS-103</b></div>
        </div>
      </div>
    </div>`;
  }
  return `<div class="project-preview preview-portfolio" aria-hidden="true">
      <div class="preview-browser">
        <div class="preview-browser-bar"><i></i><i></i><i></i></div>
        <div class="preview-portfolio-body">
          <strong>Portfólios profissionais</strong>
          <div>${portfolioDemos.map(group => `<span>${escape(group.title)}</span>`).join('')}</div>
        </div>
      </div>
    </div>`;
};

const portfolioPath = '/projetos/portfolios/';
const institutionalPath = '/projetos/sites-institucionais/';
const landingPath = '/projetos/landing-pages/';
const productPreview = product => product.preview ? `
  <figure class="product-preview">
    <figcaption><span>Fluxo previsto</span><small>Exemplo ilustrativo</small></figcaption>
    <strong>${escape(product.preview.title)}</strong>
    <ol>${product.preview.stages.map(([stage, status], index) => `
      <li${index === 1 ? ' class="product-preview-current"' : ''}>
        <span>${escape(stage)}</span><span>${escape(status)}</span>
      </li>`).join('')}</ol>
  </figure>` : '';

const productCards = () => `<div class="product-list">${products.map(product => `
  <article class="atlas-card">
    <div class="product-copy">
      <p class="label product-status">${product.status}</p>
      <h3>${product.title}<span>by Qalyon</span></h3>
      <p>${product.summary}</p>
      ${link(productPath(product), 'Conhecer ' + product.title)}
    </div>
    ${productPreview(product)}
  </article>`).join('')}</div>`;

const steps = items => `<ol class="steps">${items.map(([title, description]) => `
  <li>
  <h3>${title}</h3><p>${description}</p></li>`).join('')}</ol>`;

const pageIntro = (label, title, description, actions = '') => `
  <section class="wrap page-intro">${heading(label, title, description)}
  ${actions ? `<div class="actions">${actions}</div>` : ''}</section>`;

const sectionTitle = (label, title, description = '') => `
  <p class="label">${label}</p><h2>${title}</h2>${description ? `<p class="lead">${description}</p>` : ''}`;

const close = () => `<section class="close"><div class="wrap close-inner">
  <div><p class="label brand-label">${brandSymbol} Seu próximo projeto</p><h2>O que você quer construir?</h2>
  <p>Conte seu objetivo em poucas linhas. O escopo e o orçamento são definidos depois da primeira conversa.</p></div>
  ${quote()}</div></section>`;

const icon = path => `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;

const roadmap = [
  {
    title: 'Diagnóstico', summary: 'Objetivos, público e prioridades',
    description: 'Entendemos a operação e o que o projeto precisa resolver. O diagnóstico orienta o orçamento e ajuda a definir quais entregas fazem sentido para o seu momento.',
    deliverable: 'Escopo, proposta e critérios de entrega',
    participation: 'Você apresenta o contexto e valida o escopo.',
    icon: 'M30 20a10 10 0 1 0-20 0 10 10 0 0 0 20 0z M28 28l10 10',
  },
  {
    title: 'Design e arquitetura', summary: 'Navegação, visual e estrutura',
    description: 'Planejamos o caminho de quem usa o site e organizamos conteúdo, páginas e componentes. A estrutura técnica acompanha as necessidades identificadas no diagnóstico.',
    deliverable: 'Mapa de páginas e direção visual',
    participation: 'Você revisa o visual e a navegação.',
    icon: 'M7 11h34v26H7z M7 18h34 M13 14h.1 M17 14h.1 M12 24h10v8H12z M27 25h8 M27 30h8',
  },
  {
    title: 'Código e segurança', summary: 'Implementação, proteção e testes',
    description: 'Construímos a interface, integramos os recursos contratados e testamos os fluxos principais. Os cuidados de segurança são definidos conforme a exposição e os dados do projeto.',
    deliverable: 'Versão navegável e validação dos fluxos',
    participation: 'Você experimenta a prévia antes de aprovar a publicação.',
    icon: 'm17 14-10 10 10 10 m14-20 10 10-10 10 M27 10 21 38',
  },
  {
    title: 'Publicação e escala', summary: 'Site no ar e próximos passos',
    description: 'Publicamos no domínio combinado, conferimos os acessos e orientamos a entrega. Com o site em uso, os dados ajudam a identificar quais melhorias merecem prioridade.',
    deliverable: 'Publicação, acessos e orientações de evolução',
    participation: 'Você aprova a entrega e recebe as orientações de uso.',
    icon: 'M10 23v16h28V23 M24 32V8 m-9 9 9-9 9 9',
  },
];

const flowSection = `
<section class="holo-section tinted"><div class="wrap section">
  ${sectionTitle('Como trabalhamos', 'Do diagnóstico ao site no ar.', 'Explore as etapas para ver o que entregamos e onde você participa.')}
  <div class="roadmap holo-benefits" data-holo data-roadmap>
    <div class="roadmap-track" role="group" aria-label="Escolher etapa do projeto">
      ${roadmap.map((step, index) => `<button type="button" disabled aria-controls="roadmap-${index}" aria-pressed="${index === 0}">
        <span class="holo-icon">${icon(step.icon)}</span><span><strong>${step.title}</strong><small>${step.summary}</small></span>
        <span class="roadmap-arrow" aria-hidden="true">↗</span></button>`).join('')}
    </div>
    <div class="roadmap-panels">
      ${roadmap.map((step, index) => `<article class="glass roadmap-detail" id="roadmap-${index}"${index ? ' hidden' : ''}>
        <span class="holo-icon">${icon(step.icon)}</span>
        <h3>${step.title}</h3><p>${step.description}</p>
        <dl><div><dt>O que você recebe</dt><dd>${step.deliverable}</dd></div>
        <div><dt>Sua participação</dt><dd>${step.participation}</dd></div></dl>
      </article>`).join('')}
      <noscript><p>Próximas etapas: design e arquitetura, código e segurança, publicação e escala.</p></noscript>
    </div>
  </div>
</div></section>`;

const ecosystemSolutions = [
  ...services.map((service, index) => ({
    label: ['Sites', 'Portfólios', 'Landing pages', 'Sistemas'][index],
    title: service.title,
    description: service.summary,
    href: servicePath(service),
    action: 'Conhecer o serviço',
  })),
  {
    label: 'Atlas',
    title: 'Atlas by Qalyon',
    description: products[0].summary,
    href: productPath(products[0]),
    action: 'Conhecer o Atlas',
  },
];

const ecosystemSection = `
<section class="wrap section" id="ecossistema" data-ecosystem>
  ${sectionTitle('Serviços digitais', 'O projeto certo para o seu objetivo.',
    'Desenvolvimento para profissionais autônomos, pequenos negócios e equipes com necessidades próprias.')}
  <div class="ecosystem ecosystem-stage" data-ecosystem-stage>
    <div class="ecosystem-controls" data-ecosystem-controls role="group" aria-label="Escolher solução" hidden>
      ${ecosystemSolutions.map((solution, index) => `<button type="button" aria-pressed="${index === 0}" aria-controls="ecosystem-panel-${index}">${escape(solution.label)}</button>`).join('')}
    </div>
    <div class="ecosystem-render" data-ecosystem-render aria-hidden="true">
      <div class="ecosystem-fallback"><i></i><i></i><i></i></div>
      <canvas width="800" height="600"></canvas>
    </div>
    <div class="ecosystem-displays" aria-live="polite">
      ${ecosystemSolutions.map((solution, index) => {
        const name = escape(solution.title);
        return `<article class="ecosystem-panel" id="ecosystem-panel-${index}">
          <h3 class="ecosystem-name">
            <span class="ecosystem-name-depth" aria-hidden="true">${name}</span>
            <span class="ecosystem-name-depth" aria-hidden="true">${name}</span>
            <span class="ecosystem-name-face">${name}</span>
          </h3>
          <p>${escape(solution.description)}</p>
          <a class="showcase-link" href="${escape(solution.href)}">${escape(solution.action)}</a>
        </article>`;
      }).join('')}
    </div>
  </div>
</section>`;

const benefitsSection = `
<section class="wrap section holo-section">
  ${sectionTitle('Presença digital', 'O que seu site facilita na prática.', 'Dê ao cliente um lugar para conhecer seu trabalho e decidir como falar com você.')}
  <div class="holo-benefits" data-holo>
    <div class="holo-hub"><span class="holo-icon">${icon('M6 10h36v28H6z M6 17h36 M12 13h.1 M16 13h.1 M22 23h13 M22 29h10 M12 23h5v9h-5z')}</span><p>Seu site</p></div>
    <ul class="holo-branches">
      <li><span class="holo-icon">${icon('M30 20a10 10 0 1 0-20 0 10 10 0 0 0 20 0z M28 28l10 10')}</span><div><h3>Ser encontrado</h3><p>Tenha um endereço próprio para compartilhar nas redes e facilitar a descoberta pelos buscadores.</p></div></li>
      <li><span class="holo-icon">${icon('M8 12h32v25H8z M17 12V8h14v4 M8 23h32 M21 23v4h6v-4')}</span><div><h3>Mostrar seu trabalho</h3><p>Reúna serviços, exemplos e respostas às dúvidas que surgem antes da contratação.</p></div></li>
      <li><span class="holo-icon">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</span><div><h3>Facilitar o contato</h3><p>Deixe claro como pedir um orçamento, agendar uma conversa ou chamar no seu canal de atendimento.</p></div></li>
    </ul>
  </div>
</section>`;

const home = `
<section class="hero-stage">
<div class="neural-scene" aria-hidden="true">
  <canvas id="neural-canvas" width="960" height="540"></canvas>
</div>
<div class="wrap home-hero">
  <div class="hero-main">
  ${heading('Software house brasileira', site.slogan,
    'A Qalyon cria seus próprios SaaS e desenvolve sites, landing pages, portfólios profissionais e sistemas web sob medida.')}
  <div class="actions">${quote()}${link('/servicos/', 'Explorar serviços')}</div></div>
  <aside class="hero-index" aria-label="Frentes da Qalyon">
    <p class="label brand-label">${brandSymbol} Qalyon / duas frentes</p>
    <a href="/produtos/"><span><strong>Produtos próprios</strong><small>Atlas, nosso primeiro SaaS</small></span><span aria-hidden="true">↗</span></a>
    <a href="/servicos/"><span><strong>Serviços digitais</strong><small>Da presença digital à operação</small></span><span aria-hidden="true">↗</span></a>
  </aside>
  <button type="button" class="motion-toggle" id="motion-toggle" hidden>Pausar movimento</button>
</div>
</section>
<section class="band"><div class="wrap band-inner"><span>Estratégia, design e código</span><span>Projetos avulsos</span><span>Propostas sob consulta</span></div></section>
${ecosystemSection}
<section class="tinted showcase-section" id="nossos-trabalhos"><div class="wrap section">
  <div class="showcase-heading"><div>${sectionTitle('Nossos trabalhos', 'Veja como uma ideia ganha forma.',
  'Demonstrações autorais para explorar soluções, conteúdo e navegação em diferentes contextos.')}</div>
  <a class="arrow-link" href="/projetos/#indice-trabalhos">Ver todos os trabalhos</a></div>
  ${workGallery}</div></section>
<section class="wrap section">${sectionTitle('Produtos próprios', 'Do orçamento ao pagamento, em um só fluxo.')}${productCards()}</section>
${flowSection}
${benefitsSection}
${close()}`;

const servicesPage = `
<section class="service-hero">
  <div class="wrap service-hero-inner">
    <div class="service-hero-copy">
      ${heading('Serviços digitais', 'Desenvolvimento sob medida para o seu negócio.',
        'Sites, portfólios, landing pages e sistemas web para apresentar seu trabalho e simplificar a rotina do seu negócio.')}
      <div class="actions"><a class="button" href="/contato/">Solicitar orçamento</a><a class="arrow-link" href="#solucoes">Explorar soluções</a></div>
    </div>
    ${servicesHeroArtwork}
  </div>
</section>
<section class="wrap section" id="solucoes">
  ${sectionTitle('Catálogo', 'Escolha pelo que você precisa resolver.')}
  ${servicesCatalog}
</section>
<section class="service-terms">
  <div class="wrap section compact">
    ${sectionTitle('Condições comerciais', 'Um projeto por vez, com escopo claro.')}
    <dl>
      <div><dt>Proposta sob consulta</dt><dd>O projeto é contratado de forma avulsa. A proposta descreve o escopo, as entregas, os prazos e as condições de pagamento.</dd></div>
      <div><dt>Domínio e hospedagem</dt><dd>Ficam em sua titularidade. A configuração e a publicação são alinhadas no escopo do projeto.</dd></div>
      <div><dt>Novas demandas</dt><dd>Melhorias e outras entregas podem receber orçamento próprio conforme a necessidade.</dd></div>
    </dl>
    <a class="button" href="/contato/">Solicitar orçamento</a>
  </div>
</section>`;

const servicePage = service => {
  const visual = serviceVisuals[service.slug];
  return `
<div class="service-detail service-tile--${service.slug}">
  <section class="service-detail-hero">
    <div class="wrap">
      <a class="service-detail-back" href="/servicos/">Todos os serviços</a>
      <div class="service-detail-intro">
        <div class="service-detail-heading">
          ${heading('Serviços digitais', escape(service.title), escape(service.summary))}
          <div class="actions">
            <a class="button" href="/contato/?servico=${encodeURIComponent(service.slug)}">Solicitar orçamento</a>
            <a class="arrow-link" href="${visual.demo}">${visual.demoLabel}</a>
          </div>
        </div>
        <div class="service-detail-art service-tile-art" aria-hidden="true">${visual.artwork}</div>
      </div>
    </div>
  </section>
  <section class="wrap section service-detail-scope">
    <div class="service-detail-audience">
      <h2>Para quem serve</h2>
      <p>${escape(service.audience)}</p>
      ${service.slug === 'sites-institucionais' ? '<p id="portfolio-profissional">Quer destacar trabalhos e especialidades? <a href="/servicos/portfolio-profissional/">Conheça os portfólios profissionais</a>.</p>' : ''}
    </div>
    <div class="service-detail-deliverables">
      <h2>O que pode incluir</h2>
      <ul>${service.includes.map(item => `<li>${escape(item)}</li>`).join('')}</ul>
      <p>${escape(service.extra)}</p>
    </div>
  </section>
  <section class="wrap service-detail-contact">
    <div>
      ${sectionTitle('Orçamento', 'Vamos entender o que você precisa.')}
      <p>A contratação é avulsa e o preço é sob consulta. O domínio e a hospedagem ficam em sua titularidade.</p>
    </div>
    <a class="button" href="/contato/?servico=${encodeURIComponent(service.slug)}">Solicitar orçamento</a>
  </section>
</div>`;
};

const productsPage = `
${pageIntro('Produtos próprios', 'Produtos criados pela Qalyon.',
  'Desenvolvemos SaaS próprios para organizar processos e facilitar o trabalho de quem presta serviços.')}
<section class="wrap section compact">${sectionTitle('Primeiro SaaS da Qalyon', 'Do orçamento ao pagamento.')}${productCards()}</section>`;

const productPage = product => `
${pageIntro('Produto próprio / ' + product.status, product.title + ' by Qalyon', product.summary)}
<section class="wrap section compact split"><div>${sectionTitle('Contexto', 'Cada serviço tem uma sequência.')}<p class="lead">${product.problem}</p></div>
  ${productPreview(product)}</section>
<section class="tinted"><div class="wrap section">${sectionTitle('Em desenvolvimento', 'Fluxo previsto do Atlas.')}${steps(product.flow)}</div></section>
<section class="wrap section compact">${link('/produtos/', 'Voltar para produtos')}</section>`;

const catalogIcons = {
  todos: 'M8 8h12v12H8z M28 8h12v12H28z M8 28h12v12H8z M28 28h12v12H28z',
  pedidos: 'M10 16h28l3 24H7l3-24Zm7 0v-3a7 7 0 0 1 14 0v3',
  agendamentos: 'M8 12h32v28H8z M8 21h32m-24-14v10m16-10v10m-14 13 4 4 8-8',
  orcamentos: 'M11 7h19l7 7v27H11z M30 7v8h7M17 23h14m-14 6h14m-14 6h9',
  advocacia: 'M24 8v32m-11 0h22M8 14h32M13 14 7 28h12l-6-14Zm22 0-6 14h12l-6-14Z',
  psicologia: 'M8 10h32v22H23L12 40v-8H8z M16 21h16',
  nutricao: 'M24 38C8 38 7 25 8 11c15-1 27 4 27 16 0 7-5 11-11 11Zm-6-16 15 15m-5-23c4-4 8-5 13-6 0 8-2 13-6 16',
  fisioterapia: 'M6 25h9l5-12 8 23 5-11h9',
  'personal-trainer': 'M4 20v8m6-13v18m6-22v26m0-13h16m0-13v26m6-22v18m6-13v8',
};

const catalogArtwork = kind => `<div class="catalog-art" aria-hidden="true">
  <div class="catalog-orbit"></div>
  <div class="catalog-floor"></div>
  <div class="catalog-art-stack">
    ${kind === 'portfolio' ? `<div class="catalog-screen catalog-screen--back"></div>
      <div class="catalog-screen catalog-screen--photo"><img src="/assets/work-lia.webp" width="1440" height="960" alt=""></div>
      <div class="catalog-float">${icon(catalogIcons['personal-trainer'])}<span>Lia Prado</span></div>`
    : kind === 'institutional' ? `<div class="catalog-screen catalog-screen--browser"><i></i><img src="/assets/almeida-torres.webp" width="600" height="343" alt=""></div>
      <div class="catalog-float catalog-float--phone"><span>Almeida<br>Torres</span><i></i><i></i></div>`
    : `<div class="catalog-screen catalog-screen--campaign"><div class="catalog-campaign-rings"></div><b>Da oferta<br>à ação.</b></div>
      <div class="catalog-float catalog-float--goals">${icon(catalogIcons.pedidos)}${icon(catalogIcons.agendamentos)}${icon(catalogIcons.orcamentos)}</div>`}
  </div>
</div>`;

const catalogPage = ({ kind, title, description, heading: catalogHeading, groups, filterLabel }) => `
<div class="project-catalog project-catalog--${kind}">
  <section class="catalog-hero">
    <div class="wrap">
      <a class="catalog-back" href="/projetos/">Todos os projetos</a>
      <div class="catalog-hero-layout">
        <div class="catalog-hero-copy">
          ${heading('Nossos trabalhos', title, description)}
          <a class="button" href="#portfolios-demonstrativos">Explorar demonstrações</a>
        </div>
        ${catalogArtwork(kind)}
      </div>
    </div>
  </section>
  <section class="wrap section" id="portfolios-demonstrativos" data-project-catalog>
    <h2>${catalogHeading}</h2>
    <div class="portfolio-index" role="group" aria-label="${filterLabel}" hidden>
      <button type="button" data-portfolio-filter="todos" aria-pressed="true">${icon(catalogIcons.todos)} Todos</button>
      ${groups.map(group => `<button type="button" data-portfolio-filter="${group.slug}" aria-pressed="false">${icon(catalogIcons[group.slug])} ${escape(group.title)}</button>`).join('')}
    </div>
    ${groups.map(group => `
    <section class="portfolio-group catalog-area--${group.slug}" data-portfolio-area="${group.slug}" id="portfolio-${group.slug}" aria-labelledby="portfolio-title-${group.slug}">
      <h3 id="portfolio-title-${group.slug}">${icon(catalogIcons[group.slug])} ${escape(group.title)}</h3>
      <ul class="portfolio-grid">${group.items.map(demo => `
        <li class="portfolio-card">
          <div class="catalog-card-art" aria-hidden="true">${icon(catalogIcons[group.slug])}</div>
          <div class="catalog-card-copy">
            <h4>${escape(demo.title)}</h4>
            <p>${escape(demo.summary)}</p>
            <a class="showcase-link" href="${escape(demo.url)}" aria-label="Abrir demonstração de ${escape(demo.title)}">Abrir demonstração</a>
          </div>
        </li>`).join('')}</ul>
    </section>`).join('')}
  </section>
</div>`;

const portfolioPage = catalogPage({
  kind: 'portfolio',
  title: 'Portfólios profissionais.',
  description: 'Explore perfis fictícios com layouts e abordagens diferentes. Os links abrem as prévias privadas de cada site.',
  heading: 'Explore os portfólios por área.',
  groups: portfolioDemos,
  filterLabel: 'Filtrar portfólios por área',
});

const institutionalPage = catalogPage({
  kind: 'institutional',
  title: 'Sites institucionais.',
  description: 'Conheça sites demonstrativos de empresas e organizações fictícias. Os links abrem as prévias privadas de cada site.',
  heading: 'Explore os sites por área.',
  groups: institutionalDemos,
  filterLabel: 'Filtrar sites institucionais por área',
});

const landingPage = catalogPage({
  kind: 'landing',
  title: 'Landing pages para campanhas e ofertas.',
  description: 'Três campanhas fictícias com objetivos comerciais diferentes. Os links abrem as prévias privadas de cada página.',
  heading: 'Explore as campanhas por objetivo.',
  groups: landingDemos,
  filterLabel: 'Filtrar landing pages por objetivo',
});

const workIndex = [
  ['Portfólios profissionais', portfolioDemos.flatMap(group => group.items)],
  ['Sites institucionais', institutionalDemos.flatMap(group => group.items)],
  ['Landing pages', landingDemos.flatMap(group => group.items)],
  ['Sistemas web', projects.filter(project => project.service === 'sistemas-web')
    .map(project => ({ title: project.title, url: projectPath(project) }))],
];

const projectsPage = `
${pageIntro('Nossos trabalhos', 'Projetos e demonstrações.',
  'Explore exemplos autorais de sites, campanhas e sistemas. Cada demonstração apresenta um cenário fictício e escolhas de projeto.')}
<section class="wrap section compact">${sectionTitle('Seleção de projetos', 'Veja os exemplos em contexto.')}${workGallery}</section>
<section class="wrap section compact" id="indice-trabalhos"><h2>Todos os trabalhos</h2>
  <div class="work-index">${workIndex.map(([name, items]) => `<div><h3>${escape(name)}</h3>
    <ul>${items.map(item => `<li><a href="${escape(item.url)}">${escape(item.title)}</a></li>`).join('')}</ul></div>`).join('')}</div>
</section>
${close()}`;

const projectPage = project => `
${pageIntro('Nossos trabalhos / ' + project.kind, project.title, project.summary)}
<section class="wrap section compact"><div class="demo">
  <p class="label">${project.kind === 'Demonstração' ? 'Amostra visual / cenário fictício' : 'Apresentação do projeto'}</p><div class="split">
  <div><h2>${project.exampleTitle}</h2><p>${project.exampleText}</p></div>${projectPreview(project)}</div>
  <ol class="demo-items">${project.sections.map(item => `<li>${item}</li>`).join('')}</ol></div>
  <div class="actions">${project.demoUrl ? link(project.demoUrl, 'Abrir site demonstrativo (prévia privada)') : ''}${link('/projetos/', 'Voltar aos trabalhos')}${quote(project.service)}</div></section>`;

const systemProjectPage = project => `
<div class="project-catalog project-catalog--system">
  <section class="catalog-hero">
    <div class="wrap">
      <a class="catalog-back" href="/projetos/">Todos os projetos</a>
      <div class="catalog-hero-layout">
        <div class="catalog-hero-copy">
          ${heading('Demonstração de sistema web', escape(project.title), escape(project.summary))}
          <a class="button" href="/contato/?servico=${encodeURIComponent(project.service)}">Solicitar orçamento</a>
        </div>
        <div class="catalog-art" aria-hidden="true">
          <div class="catalog-orbit"></div>
          <div class="catalog-floor"></div>
          <div class="catalog-art-stack catalog-art-stack--system">${projectPreview(project)}</div>
        </div>
      </div>
    </div>
  </section>
  <section class="wrap section catalog-system-detail">
    <div><h2>${escape(project.exampleTitle)}</h2><p class="lead">${escape(project.exampleText)}</p></div>
    <ol class="catalog-system-flow">${project.sections.map(item => `<li>${escape(item)}</li>`).join('')}</ol>
  </section>
</div>`;

const aboutPage = `
<section class="about-hero">
  <div class="about-hero-art" aria-hidden="true">
    <img src="/assets/loop-1280.webp" srcset="/assets/loop-640.webp 640w, /assets/loop-1280.webp 1280w"
      sizes="(max-width: 700px) 100vw, 72vw" width="1280" height="720" fetchpriority="high" alt="">
  </div>
  <div class="wrap about-hero-inner">
    <div class="about-hero-copy">
      ${heading('Sobre a Qalyon', 'Tecnologia com propósito e precisão.',
        'Somos uma software house que desenvolve produtos próprios e soluções digitais sob medida.')}
      <a class="arrow-link" href="#nossa-atuacao">Conheça nossa atuação</a>
    </div>
  </div>
</section>
<section class="wrap section about-focus" id="nossa-atuacao">
  ${sectionTitle('Nossa atuação', 'Duas frentes de desenvolvimento.')}
  <div class="about-branches">
    <article class="about-branch">
      <h3>Serviços digitais</h3>
      <p>Criamos sites, landing pages, portfólios profissionais e sistemas web sob medida, com foco inicial em profissionais autônomos e pequenos negócios.</p>
      <a class="arrow-link" href="/servicos/">Conhecer os serviços</a>
    </article>
    <div class="about-node" aria-hidden="true">
      <div class="about-node-tilt"><div></div><div></div><div>${brandSymbol}</div></div>
    </div>
    <article class="about-branch">
      <h3>Produtos próprios</h3>
      <p>Desenvolvemos software para organizar processos. O Atlas, nosso primeiro SaaS, está em desenvolvimento para acompanhar serviços do orçamento ao pagamento.</p>
      <a class="arrow-link" href="/produtos/atlas/">Conhecer o Atlas</a>
    </article>
  </div>
</section>
<section class="about-process">
  <div class="wrap section">
    ${sectionTitle('Forma de trabalho', 'Clareza em cada etapa.')}
    <ol class="about-process-list">${process.map(([title, description]) => `<li><h3>${escape(title)}</h3><p>${escape(description)}</p></li>`).join('')}</ol>
  </div>
</section>
${close()}`;

const whatsapp = contact.whatsappBusiness;
if (whatsapp !== null && !/^55[1-9]\d{9,10}$/.test(whatsapp)) {
  throw new Error('Informe o número oficial brasileiro em formato internacional.');
}
const whatsappUrl = whatsapp ? 'https://wa.me/' + whatsapp : '';
const emailUrl = 'mailto:' + contact.email;

const contactPage = `
<section class="quote-intro"><div class="wrap page-intro">
  ${heading('Contato comercial', 'Solicitar orçamento.',
    'Conte o que você quer colocar no ar, melhorar ou automatizar. Usamos essas informações para entender o projeto e preparar uma proposta de acordo com o escopo.')}
</div></section>
<section class="wrap section compact quote-layout">
  <aside class="quote-sidebar" aria-label="Canais e próximos passos">
    <div class="quote-channel glass">
      <span class="holo-icon">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</span>
      <h2>Prefere conversar?</h2>
      <p>Comece pelo WhatsApp e conte sua ideia no seu ritmo.</p>
      ${whatsappUrl ? link(whatsappUrl, 'Conversar no WhatsApp', true) : '<p class="quote-channel-status">O WhatsApp será liberado após a configuração do número comercial.</p>'}
      ${link(emailUrl, 'Enviar e-mail')}
    </div>
    <div class="quote-next">
      <h2>Como o orçamento é preparado</h2>
      <dl>
        <div><dt>Entendemos seu objetivo</dt><dd>O briefing ajuda a identificar o que você precisa e o que já tem em mãos.</dd></div>
        <div><dt>Alinhamos escopo e prazos</dt><dd>Se faltar algum detalhe, conversamos para definir prioridades.</dd></div>
        <div><dt>Apresentamos a proposta</dt><dd>Você recebe as entregas previstas, os prazos e o investimento para avaliar.</dd></div>
      </dl>
    </div>
  </aside>
  <div class="contact-panel quote-panel glass">
    <div class="quote-panel-heading">
      <div><p class="label">Briefing inicial</p><h2>Conte sobre seu projeto</h2></div>
      <span class="quote-tag">Orçamento sob medida</span>
    </div>
    <p id="form-status">Preencha os campos obrigatórios. Se ainda estiver definindo o projeto, deixe os detalhes opcionais em branco.</p>
    <form id="quote-form" data-whatsapp-url="${whatsappUrl}" data-email-url="${emailUrl}" aria-describedby="form-status">
      <fieldset>
        <legend>Seus dados</legend>
        <div class="quote-fields">
          <div><label for="name">Nome</label><input id="name" name="name" autocomplete="name" maxlength="100" required></div>
          <div><label for="reply">E-mail ou WhatsApp com DDD</label><input id="reply" name="reply" maxlength="120" placeholder="Seu melhor contato" required></div>
          <div class="quote-wide"><label for="business">Empresa ou marca <small>Opcional</small></label><input id="business" name="business" autocomplete="organization" maxlength="100"></div>
        </div>
      </fieldset>
      <fieldset>
        <legend>O que você precisa</legend>
        <div class="quote-fields">
          <div><label for="service">Serviço de interesse</label><select id="service" name="service" required>
            <option value="">Selecione uma opção</option>
            ${services.map(service => `<option value="${service.slug}">${service.title}</option>`).join('')}
            <option value="a-definir">Ainda preciso definir</option>
          </select></div>
          <div><label for="stage">Momento do projeto <small>Opcional</small></label><select id="stage" name="stage">
            <option value="">Selecione, se souber</option>
            <option>Começar do zero</option><option>Melhorar algo existente</option><option>Substituir uma solução</option>
          </select></div>
          <div class="quote-wide"><label for="goal">O que você quer alcançar?</label><textarea id="goal" name="goal" minlength="10" maxlength="800" rows="4" placeholder="Ex.: Quero apresentar meus serviços e receber pedidos de orçamento." aria-describedby="goal-help" required></textarea><small class="quote-help" id="goal-help">Conte seu objetivo e o que gostaria de incluir no projeto.</small></div>
        </div>
      </fieldset>
      <fieldset>
        <legend>Prazos e referências</legend>
        <div class="quote-fields">
          <div><label for="deadline">Prazo desejado <small>Opcional</small></label><select id="deadline" name="deadline">
            <option value="">Sem prazo definido</option><option>Em até 30 dias</option><option>Entre 1 e 2 meses</option><option>Mais de 2 meses</option>
          </select></div>
          <div><label for="reference">Site atual ou referência <small>Opcional</small></label><input id="reference" name="reference" type="url" maxlength="220" placeholder="https://"></div>
        </div>
      </fieldset>
      <div class="quote-submit">
        <p>Confira o briefing antes de compartilhar. <a href="/privacidade/">Aviso de privacidade</a></p>
        <button class="button" id="quote-review" type="submit" disabled>Revisar briefing <span aria-hidden="true">↗</span></button>
      </div>
      <noscript><p>Ative o JavaScript para montar o resumo do briefing.</p></noscript>
    </form>
    <dialog class="quote-dialog" id="quote-dialog" aria-labelledby="quote-dialog-title">
      <h2 id="quote-dialog-title">Confira seu briefing</h2>
      <p>${whatsappUrl ? 'Copie o resumo ou abra o WhatsApp ou seu aplicativo de e-mail com a mensagem preenchida. Revise e envie pelo canal escolhido.' : 'O resumo fica no seu navegador. Você pode copiá-lo para compartilhar quando quiser.'}</p>
      <label for="quote-summary">Resumo do projeto</label>
      <textarea id="quote-summary" rows="9" readonly></textarea>
      <div class="quote-dialog-actions">
        ${whatsappUrl ? '<a class="button" id="quote-send">Abrir briefing no WhatsApp</a>' : ''}
        <a class="button quote-secondary" id="quote-email">Abrir briefing no e-mail</a>
        <button class="button quote-secondary" id="quote-copy" type="button">Copiar briefing</button>
        <button class="button quote-secondary" id="quote-close" type="button">Voltar ao formulário</button>
      </div>
      <p class="quote-copy-status" id="quote-copy-status" role="status"></p>
    </dialog>
  </div>
</section>`;

const privacyPage = `
${pageIntro('Privacidade', 'Aviso de privacidade da prévia.',
  'Este aviso descreve como funciona a versão restrita do site institucional da Qalyon.')}
<section class="wrap section compact prose body-copy">
  <h2>Campos de orçamento</h2><p>O briefing é montado no navegador. O site não guarda os valores digitados. Se você abrir o briefing no WhatsApp, o texto será encaminhado ao serviço para preencher a conversa. Se escolher o e-mail, seu aplicativo abrirá um rascunho com o resumo. Você decide quando enviar a mensagem.</p>
  <h2>Cookies e infraestrutura</h2><p>A aplicação não instala cookies próprios de rastreamento e não inclui pixels de publicidade ou ferramentas de análise de comportamento. A plataforma de hospedagem e de acesso pode tratar dados técnicos para autenticação, funcionamento e segurança.</p>
  <h2>Atendimento comercial</h2><p>Antes de ativar o recebimento de solicitações, este aviso será atualizado com a identificação do responsável pelo tratamento, canal de privacidade e detalhes sobre uso, retenção e acesso aos dados recebidos.</p>
  ${link('/contato/', 'Voltar para contato')}</section>`;

export const pages = [
  { path: '/', title: 'Qalyon — Software house, sites, sistemas e SaaS', description: 'Conheça a Qalyon, software house que cria SaaS próprios e desenvolve sites, landing pages, portfólios profissionais e sistemas web sob medida.', body: home },
  { path: '/servicos/', title: 'Serviços digitais — Qalyon', description: 'Sites institucionais, landing pages, portfólios profissionais e sistemas web. Entenda as soluções e solicite um orçamento.', body: servicesPage },
  ...services.map(service => ({ path: servicePath(service), title: service.title + ' — Qalyon', description: service.summary, body: servicePage(service) })),
  { path: '/produtos/', title: 'Produtos próprios — Qalyon', description: 'Conheça os produtos próprios da Qalyon, incluindo o Atlas, primeiro SaaS da empresa, em desenvolvimento.', body: productsPage },
  ...products.map(product => ({ path: productPath(product), title: product.title + ' by Qalyon — Em desenvolvimento', description: product.summary, body: productPage(product) })),
  { path: '/projetos/', title: 'Projetos e demonstrações — Qalyon', description: 'Explore os trabalhos autorais da Qalyon, com exemplos de portfólio profissional, landing page e sistema web.', body: projectsPage },
  { path: portfolioPath, title: 'Portfólios profissionais — Nossos trabalhos', description: 'Explore demonstrações de portfólios profissionais em Advocacia, Psicologia, Nutrição, Fisioterapia e Personal Trainer.', body: portfolioPage, script: '/assets/portfolio-filter.js' },
  { path: institutionalPath, title: 'Sites institucionais — Nossos trabalhos', description: 'Explore sites institucionais demonstrativos por área de atuação.', body: institutionalPage, script: '/assets/portfolio-filter.js' },
  { path: landingPath, title: 'Landing pages — Nossos trabalhos', description: 'Explore landing pages demonstrativas para gerar pedidos, agendamentos e solicitações de orçamento.', body: landingPage, script: '/assets/portfolio-filter.js' },
  ...projects.map(project => ({ path: projectPath(project), title: project.title + ' — Demonstração Qalyon', description: project.summary, body: project.service === 'sistemas-web' ? systemProjectPage(project) : projectPage(project) })),
  { path: '/sobre/', title: 'Sobre a Qalyon — Software house', description: 'Entenda como a Qalyon cria produtos SaaS e desenvolve soluções digitais sob medida.', body: aboutPage },
  { path: '/contato/', title: 'Solicitar orçamento — Qalyon', description: 'Prepare um briefing para seu projeto digital ou consulte o canal de atendimento da Qalyon.', body: contactPage, script: '/assets/contact.js' },
  { path: '/privacidade/', title: 'Aviso de privacidade — Qalyon', description: 'Entenda o tratamento de dados adotado na versão restrita do site da Qalyon.', body: privacyPage },
];

export function layout(page, origin, isPreview) {
  const active = path => page.path.startsWith(path) ? ' aria-current="' + (page.path === path ? 'page' : 'location') + '"' : '';
  const logo = `<a class="brand" href="/" aria-label="Qalyon, início"><img src="/assets/logo.webp" width="600" height="190" alt=""></a>`;
  const socialImage = origin + '/assets/social.png';
  return `<!doctype html>
<html lang="pt-BR" data-theme="dark">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0E1317">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'">
  <meta name="robots" content="${isPreview ? 'noindex,nofollow' : 'index,follow'}">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  ${isPreview ? '' : `<link rel="canonical" href="${origin + page.path}">`}
  <meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Qalyon"><meta property="og:title" content="${escape(page.title)}">
  <meta property="og:description" content="${escape(page.description)}"><meta property="og:url" content="${origin + page.path}">
  <meta property="og:image" content="${socialImage}"><meta property="og:image:alt" content="Logotipo Qalyon Tecnologia">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-symbol.png"><link rel="stylesheet" href="/assets/tokens.css">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="module" src="/assets/motion.js"></script>
  ${page.path === '/' ? '<script type="module" src="/assets/experience.js"></script><script type="module" src="/assets/ecosystem.js"></script>' : ''}
  ${['/', '/projetos/'].includes(page.path) ? '<link rel="stylesheet" href="/assets/work-gallery.css?v=4"><script type="module" src="/assets/work-gallery.js?v=3"></script>' : ''}
  ${page.path === '/servicos/' ? '<link rel="stylesheet" href="/assets/services-page.css?v=2">' : ''}
  ${page.path.startsWith('/servicos/') && page.path !== '/servicos/' ? '<link rel="stylesheet" href="/assets/services-page.css?v=2"><link rel="stylesheet" href="/assets/service-detail.css">' : ''}
  ${page.path === '/sobre/' ? '<link rel="stylesheet" href="/assets/about-page.css">' : ''}
  ${[portfolioPath, institutionalPath, landingPath].includes(page.path) || projects.some(project => project.service === 'sistemas-web' && projectPath(project) === page.path) ? '<link rel="stylesheet" href="/assets/project-catalog.css">' : ''}
  ${page.script ? `<script src="${page.script}" defer></script>` : ''}
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="header"><div class="wrap header-inner">${logo}
<nav aria-label="Navegação principal">${site.navigation.map(([path, label]) =>
  `<a href="${path}"${active(path)}>${label}</a>`).join('')}</nav>
<a class="button header-cta" href="/contato/">Solicitar orçamento <span aria-hidden="true">↗</span></a></div></header>
<main id="conteudo" tabindex="-1">${page.body}</main>
<footer class="footer"><div class="wrap footer-inner">
  <div class="footer-brand">${logo}<p>${site.slogan}</p></div>
${page.path === '/' ? '' : '<button type="button" class="motion-toggle footer-motion" id="motion-toggle" hidden>Pausar movimento</button>'}
<a href="/privacidade/"${active('/privacidade/')}>Privacidade</a><span>© ${new Date().getUTCFullYear()} Qalyon</span></div></footer>
</body></html>`;
}
