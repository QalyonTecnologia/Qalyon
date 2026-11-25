import { projects, services } from '../content.mjs';
import { portfolioDemos } from '../portfolio-demos.mjs';
import { institutionalDemos } from '../institutional-demos.mjs';
import { landingDemos } from '../landing-demos.mjs';
import { workGallery } from '../work-gallery.mjs';
import { close, escape, heading, icon, link, projectPath, sectionTitle, servicePath } from '../components.mjs';

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

export const portfolioPath = '/projetos/portfolios/';
export const institutionalPath = '/projetos/sites-institucionais/';
export const landingPath = '/projetos/landing-pages/';
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
      <div class="catalog-screen catalog-screen--portfolio">
        <div class="catalog-site-toolbar"><i></i><i></i><i></i></div>
        <div class="catalog-portfolio-nav"><b>Marina Luz</b><span>Projetos</span><span>Sobre mim</span><span>Contato</span></div>
        <div class="catalog-portfolio-intro"><small>Designer independente</small><b>Design e direção de arte.</b></div>
        <div class="catalog-portfolio-projects">
          <div><img src="/assets/catalogo-portfolios.webp" width="768" height="480" alt=""></div>
          <div class="catalog-portfolio-editorial"><i></i><i></i></div>
          <div class="catalog-portfolio-branding"><i></i></div>
        </div>
      </div>
      <div class="catalog-float">${icon(catalogIcons.todos)}<span>Galeria de projetos</span></div>`
    : kind === 'institutional' ? `<div class="catalog-screen catalog-screen--browser">
        <div class="catalog-site-toolbar"><i></i><i></i><i></i></div>
        <div class="catalog-site-nav"><b>Norte Engenharia</b><span>Empresa</span><span>Soluções</span><span>Contato</span></div>
        <div class="catalog-site-cover">
          <div><b>Engenharia para<br>projetos reais.</b><span>Conheça nossas soluções</span></div>
          <div class="catalog-site-geometry"></div>
        </div>
        <div class="catalog-site-sections"><span>Áreas de atuação</span><span>Projetos realizados</span></div>
      </div>
      <div class="catalog-float catalog-float--phone"><span>Áreas de atuação</span><i></i><i></i></div>`
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

export const portfolioPage = catalogPage({
  kind: 'portfolio',
  title: 'Portfólios profissionais.',
  description: 'Explore perfis fictícios com layouts e abordagens diferentes. Os links abrem as prévias privadas de cada site.',
  heading: 'Explore os portfólios por área.',
  groups: portfolioDemos,
  filterLabel: 'Filtrar portfólios por área',
});

export const institutionalPage = catalogPage({
  kind: 'institutional',
  title: 'Sites institucionais.',
  description: 'Conheça sites demonstrativos de empresas e organizações fictícias. Os links abrem as prévias privadas de cada site.',
  heading: 'Explore os sites por área.',
  groups: institutionalDemos,
  filterLabel: 'Filtrar sites institucionais por área',
});

export const landingPage = catalogPage({
  kind: 'landing',
  title: 'Landing pages para campanhas e ofertas.',
  description: 'Três campanhas fictícias com objetivos comerciais diferentes. Os links abrem as prévias privadas de cada página.',
  heading: 'Explore as campanhas por objetivo.',
  groups: landingDemos,
  filterLabel: 'Filtrar landing pages por objetivo',
});

const systemProjects = projects.filter(project => project.service === 'sistemas-web');
const workIndex = [
  { name: 'Portfólios profissionais', href: portfolioPath, theme: 'portfolio', service: 'portfolio-profissional', items: portfolioDemos.flatMap(group => group.items) },
  { name: 'Sites institucionais', href: institutionalPath, theme: 'institutional', service: 'sites-institucionais', items: institutionalDemos.flatMap(group => group.items) },
  { name: 'Landing pages', href: landingPath, theme: 'landing', service: 'landing-pages', items: landingDemos.flatMap(group => group.items) },
  { name: 'Sistemas web', href: '#sistemas-web', theme: 'systems', service: 'sistemas-web',
    items: systemProjects.map(project => ({ title: project.title, url: projectPath(project) })) },
];

const projectIndexIcons = {
  portfolio: catalogIcons.todos,
  institutional: 'M6 9h36v30H6z M6 17h36 M12 13h.1 M17 13h.1 M13 24h10v8H13z M28 24h7 M28 30h7',
  landing: 'M8 10h32v28H8z M15 18h18 M15 24h14 M15 30h9',
  systems: 'M8 10h32v28H8z M8 18h32 M19 18v20 M29 18v20 M12 24h3 M22 24h4 M33 24h3',
};

export const projectsPage = `
<div class="projects-overview">
  <section class="projects-hero">
    <div class="wrap projects-hero-layout">
      <div class="projects-hero-copy">
        ${heading('Nossos trabalhos', 'Projetos e demonstrações.',
          'Explore portfólios, sites, campanhas e sistemas que mostram como a Qalyon aplica design e tecnologia a diferentes necessidades.')}
        <div class="actions">
          <a class="button" href="#categorias-projetos">Explorar categorias</a>
          <a class="arrow-link" href="#destaques-projetos">Ver destaques</a>
        </div>
      </div>
      <div class="projects-scene" aria-hidden="true">
        <div class="projects-scene-orbit"></div>
        <div class="projects-scene-floor"></div>
        <div class="projects-device projects-device--site">${projectPreview({ service: 'sites-institucionais' })}</div>
        <div class="projects-device projects-device--system">${projectPreview({ service: 'sistemas-web' })}</div>
        <div class="projects-device projects-device--campaign">${projectPreview({ service: 'landing-pages' })}</div>
      </div>
    </div>
  </section>
  <section class="wrap section" id="categorias-projetos">
    <h2>Explore por categoria</h2>
    <nav class="projects-categories" aria-label="Categorias de projetos">
      ${workIndex.map(({ name, href, theme, service, items }) => `<a class="projects-category projects-category--${theme}" href="${href}">
        <div class="projects-category-preview">${projectPreview({ service })}</div>
        <span class="projects-category-copy"><strong>${escape(name)}</strong>
          <span>${items.length} ${items.length === 1 ? 'demonstração' : 'demonstrações'}</span></span>
      </a>`).join('')}
    </nav>
  </section>
  <section class="projects-featured" id="destaques-projetos">
    <div class="wrap section"><h2>Projetos em destaque</h2>${workGallery}</div>
  </section>
  <section class="wrap section" id="indice-trabalhos">
    <h2>Todos os trabalhos</h2>
    <div class="projects-index">${workIndex.map(({ name, items, theme }) => `
      <section class="projects-index-panel projects-category--${theme}" id="${theme === 'systems' ? 'sistemas-web' : 'trabalhos-' + theme}" aria-labelledby="indice-${theme}">
        <div class="projects-index-heading">
          <span class="projects-index-icon" aria-hidden="true">${icon(projectIndexIcons[theme])}</span>
          <div>
            <h3 id="indice-${theme}">${escape(name)}</h3>
            <p>${items.length} ${items.length === 1 ? 'demonstração' : 'demonstrações'}</p>
          </div>
        </div>
        <ul>${items.map(item => `<li><a href="${escape(item.url)}">${escape(item.title)}</a></li>`).join('')}</ul>
      </section>`).join('')}</div>
  </section>
</div>
${close()}`;

const detailThemes = { 'sistemas-web': 'system', 'landing-pages': 'landing', 'sites-institucionais': 'institutional' };
const detailPaths = { 'sistemas-web': '/projetos/#sistemas-web', 'landing-pages': landingPath, 'sites-institucionais': institutionalPath };

export const projectPage = project => `
<div class="project-catalog project-catalog--${detailThemes[project.service] ?? 'portfolio'}">
  <section class="catalog-hero">
    <div class="wrap">
      <a class="catalog-back" href="${detailPaths[project.service] ?? '/projetos/'}">Voltar à categoria</a>
      <div class="catalog-hero-layout">
        <div class="catalog-hero-copy">
          ${heading(escape(project.kind + ' / ' + project.category), escape(project.title), escape(project.summary))}
          <div class="actions">
            <a class="button" href="/contato/?servico=${encodeURIComponent(project.service)}">Solicitar orçamento</a>
            ${project.demoUrl ? link(project.demoUrl, 'Abrir demonstração') : ''}
          </div>
        </div>
        <div class="catalog-art" aria-hidden="true">
          <div class="catalog-orbit"></div>
          <div class="catalog-floor"></div>
          <div class="catalog-art-stack catalog-detail-preview">${projectPreview(project)}</div>
        </div>
      </div>
    </div>
  </section>
  <section class="wrap section catalog-system-detail">
    <div><h2>${escape(project.exampleTitle)}</h2><p class="lead">${escape(project.exampleText)}</p></div>
    <ol class="catalog-system-flow">${project.sections.map(item => `<li>${escape(item)}</li>`).join('')}</ol>
  </section>
</div>`;
