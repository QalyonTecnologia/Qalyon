import { services } from './content.mjs';

export const serviceVisuals = {
  'sites-institucionais': {
    goal: 'Apresente sua empresa',
    demo: '/projetos/sites-institucionais/',
    demoLabel: 'Ver sites demonstrativos',
    artwork: `<div class="service-mock service-browser"><i></i><img src="/assets/almeida-torres.webp" width="600" height="343" loading="lazy" decoding="async" alt=""></div>
      <div class="service-mock service-portrait"><i></i><span></span><span></span><span></span></div>`,
  },
  'portfolio-profissional': {
    goal: 'Mostre seu trabalho',
    demo: '/projetos/portfolios/',
    demoLabel: 'Ver portfólios demonstrativos',
    artwork: `<div class="service-mock service-portfolio"><img src="/assets/work-lia.webp" width="1440" height="960" loading="lazy" decoding="async" alt=""></div>
      <div class="service-mock service-portfolio-note"><b>Lia Prado</b><span></span><span></span></div>`,
  },
  'landing-pages': {
    goal: 'Divulgue uma oferta',
    demo: '/projetos/landing-pages/',
    demoLabel: 'Ver campanhas demonstrativas',
    artwork: `<div class="service-mock service-campaign"><div class="service-campaign-orbit"></div><b>Uma oferta.<br>Um próximo passo.</b><i></i></div>
      <div class="service-mock service-campaign-flow"><span>Oferta</span><span>Ação</span></div>`,
  },
  'sistemas-web': {
    goal: 'Organize sua operação',
    demo: '/projetos/painel-de-ordens-de-servico/',
    demoLabel: 'Ver painel demonstrativo',
    artwork: `<div class="service-mock service-dashboard"><b>Ordens de serviço</b><div class="service-chart"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
      <div class="service-mock service-dashboard-status"><i></i> Em execução</div>`,
  },
};

export const servicesHeroArtwork = `<div class="service-hero-art" aria-hidden="true">
  <div class="service-hero-orbit"></div>
  <div class="service-hero-grid"></div>
  <div class="service-hero-assembly">
    <div class="service-hero-window"><div class="service-hero-toolbar"><i></i><i></i><i></i></div>
      <div class="service-hero-interface"><div></div><span></span><span></span><span></span></div>
    </div>
    <div class="service-hero-side"><div></div><span></span><span></span></div>
    <div class="service-hero-chart"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</div>`;

export const servicesCatalog = `<div class="service-gallery">
  ${services.map(service => {
    const visual = serviceVisuals[service.slug];
    return `<article class="service-tile service-tile--${service.slug}">
      <div class="service-tile-art" aria-hidden="true">${visual.artwork}</div>
      <div class="service-tile-copy">
        <p class="label">${visual.goal}</p>
        <h3>${service.title}</h3>
        <p>${service.summary}</p>
        <a class="arrow-link" href="/servicos/${service.slug}/" aria-label="Conhecer ${service.title.toLowerCase()}">Conhecer o serviço</a>
      </div>
    </article>`;
  }).join('')}
</div>`;
