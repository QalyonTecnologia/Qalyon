import { portfolioDemos } from './portfolio-demos.mjs';
import { institutionalDemos } from './institutional-demos.mjs';
import { landingDemos } from './landing-demos.mjs';

const lia = portfolioDemos.find(group => group.slug === 'personal-trainer').items.find(item => item.title === 'Lia Prado');
const almeida = institutionalDemos.find(group => group.slug === 'advocacia').items[0];
const linha = landingDemos.find(group => group.slug === 'orcamentos').items[0];

const works = [
  {
    key: 'lia', category: 'Portfólios', name: lia.title, type: 'Portfólio profissional',
    summary: 'Um circuito visual apresenta o trabalho da personal trainer e ajuda o visitante a encontrar o formato de treino ideal.',
    url: lia.url, more: '/projetos/portfolios/', moreLabel: 'Ver todos os portfólios',
    screen: '<img src="/assets/work-lia.webp" width="1440" height="960" loading="lazy" decoding="async" alt=""><div class="work-screen-type"><small>LIA PRADO</small><b>A força que<br>você <em>usa.</em></b></div>',
    detail: '<small>Treino funcional</small><b>Circuito</b><i class="work-signal"></i>',
  },
  {
    key: 'almeida', category: 'Sites institucionais', name: 'Almeida Torres', type: 'Site institucional',
    summary: 'Uma identidade editorial para apresentar os advogados, as áreas de atuação e o caminho até o primeiro atendimento.',
    url: almeida.url, more: '/projetos/sites-institucionais/', moreLabel: 'Ver todos os sites',
    screen: '<img src="/assets/almeida-torres.webp" width="600" height="343" loading="lazy" decoding="async" alt=""><div class="work-screen-type"><small>ALMEIDA TORRES</small><b>O Direito em<br><em>perspectiva.</em></b></div>',
    detail: '<small>Advocacia</small><b>AT<span> / </span></b><i class="work-rule"></i>',
  },
  {
    key: 'linha', category: 'Landing pages', name: linha.title, type: 'Landing page de campanha',
    summary: 'Uma campanha de contabilidade que conduz pequenos negócios da pesquisa no Google ao pedido de orçamento em três perguntas.',
    url: linha.url, more: '/projetos/landing-pages/', moreLabel: 'Ver todas as campanhas',
    screen: '<div class="work-rings"></div><div class="work-screen-type"><small>CONTABILIDADE</small><b>Linha<br><em>Clara.</em></b></div>',
    detail: '<small>Orçamento</small><b>Solicitar</b><i class="work-rule"></i>',
  },
  {
    key: 'painel', category: 'Sistemas web', name: 'Painel de ordens de serviço', type: 'Interface de gestão',
    summary: 'Uma visão das ordens por etapa, do agendamento à conclusão, para acompanhar a rotina de uma equipe de atendimento.',
    url: '/projetos/painel-de-ordens-de-servico/',
    screen: '<div class="work-screen-type"><small>OPERAÇÃO</small><b>Ordens de serviço</b><div class="work-board"><i>Agenda</i><i>Execução</i><i>Concluído</i></div></div>',
    detail: '<small>Atendimento</small><b>Em execução</b><i class="work-rule"></i>',
  },
];

export const workGallery = `<div class="work-gallery" data-work-gallery>
  <div class="work-controls" role="group" aria-label="Selecionar tipo de trabalho" hidden>
    ${works.map(work => `<button type="button" aria-controls="work-${work.key}" aria-pressed="false"><i class="work-dot dot-${work.key}" aria-hidden="true"></i>${work.category}</button>`).join('')}
  </div>
  ${works.map(work => `<article class="work-panel work-${work.key}" id="work-${work.key}">
    <div class="work-art" aria-hidden="true">
      <div class="work-platform"></div>
      <div class="work-assembly">
        <div class="work-device"><div class="work-chrome"><i></i><i></i><i></i></div><div class="work-screen">${work.screen}</div></div>
        <div class="work-detail">${work.detail}</div>
      </div>
    </div>
    <div class="work-copy"><p class="label">${work.type}</p><h3>${work.name}</h3><p>${work.summary}</p>
      <div class="work-actions"><a class="button" href="${work.url}">Abrir demonstração</a>
      ${work.more ? `<a class="arrow-link" href="${work.more}">${work.moreLabel}</a>` : ''}</div>
    </div>
  </article>`).join('')}
</div>`;
