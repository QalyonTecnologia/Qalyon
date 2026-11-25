import { process } from '../content.mjs';
import { brandSymbol, close, escape, heading, icon, link, sectionTitle } from '../components.mjs';

export const aboutPage = `
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
