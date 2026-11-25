import { site, services, products } from '../content.mjs';
import { workGallery } from '../work-gallery.mjs';
import { brandSymbol, close, escape, heading, icon, link, productPath, quote, sectionTitle, servicePath } from '../components.mjs';
import { productCards } from './products.mjs';

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

export const home = `
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
