import { products } from '../content.mjs';
import { escape, heading, link, productPath, sectionTitle, steps } from '../components.mjs';

const productHero = (label, title, description, preview, actions) => `
  <section class="product-hero"><div class="wrap product-hero-layout">
    <div class="product-hero-copy">
      ${heading(label, title, description)}
      <div class="actions">${actions}</div>
    </div>
    <div class="product-hero-art">${preview}</div>
  </div></section>`;

const productPreview = product => product.preview ? `
  <figure class="product-preview">
    <figcaption><span>Fluxo previsto</span><small>Exemplo ilustrativo</small></figcaption>
    <strong>${escape(product.preview.title)}</strong>
    <ol>${product.preview.stages.map(([stage, status], index) => `
      <li${index === 1 ? ' class="product-preview-current"' : ''}>
        <span>${escape(stage)}</span><span>${escape(status)}</span>
      </li>`).join('')}</ol>
  </figure>` : '';

export const productCards = () => `<div class="product-list">${products.map(product => `
  <article class="atlas-card">
    <div class="product-copy">
      <p class="label product-status">${escape(product.status)}</p>
      <h3>${escape(product.title)}<span>by Qalyon</span></h3>
      <p>${escape(product.summary)}</p>
      ${link(productPath(product), 'Conhecer ' + product.title)}
    </div>
    ${productPreview(product)}
  </article>`).join('')}</div>`;
export const productsPage = `
${productHero('Produtos próprios', 'Tecnologia para quem presta serviços.',
  'Desenvolvemos SaaS próprios para organizar processos e facilitar o trabalho de quem presta serviços.',
  `<div class="product-portfolio-preview"><p class="label">Em desenvolvimento</p><p><strong>Atlas</strong> by Qalyon</p>
    <p>Cadastro, orçamento, agenda, execução e pagamento.</p></div>`, link('#produtos-proprios', 'Explorar produtos'))}
<section class="wrap section" id="produtos-proprios">${sectionTitle('Primeiro SaaS da Qalyon', 'Do orçamento ao pagamento.')}${productCards()}</section>`;

export const productPage = product => `
${productHero(escape('Produto próprio / ' + product.status), escape(product.title + ' by Qalyon'),
  escape(product.summary), productPreview(product), link('#fluxo-produto', 'Ver fluxo previsto', true) + link('/produtos/', 'Todos os produtos'))}
<section class="wrap section"><div>${sectionTitle('Contexto', 'Cada serviço tem uma sequência.')}<p class="lead">${escape(product.problem)}</p></div></section>
<section class="tinted" id="fluxo-produto"><div class="wrap section">${sectionTitle(escape(product.status), 'Fluxo previsto do ' + escape(product.title) + '.')}${steps(product.flow)}</div></section>`;
