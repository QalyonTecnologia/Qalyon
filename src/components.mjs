export const escape = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));

export const heading = (label, title, description = '') => `
  <p class="label">${label}</p><h1>${title}</h1>
  ${description ? `<p class="lead">${description}</p>` : ''}`;
export const link = (href, label, primary = false) =>
  `<a class="${primary ? 'button' : 'arrow-link'}" href="${escape(href)}">${escape(label)}</a>`;
export const quote = (slug = '') =>
  link(slug ? '/contato/?servico=' + encodeURIComponent(slug) : '/contato/', 'Solicitar orçamento', true);
export const servicePath = service => `/servicos/${service.slug}/`;
export const projectPath = project => `/projetos/${project.slug}/`;
export const productPath = product => `/produtos/${product.slug}/`;

export const brandSymbol = '<img class="brand-symbol" src="/assets/qalyon-symbol.webp" width="99" height="104" alt="">';
export const steps = items => `<ol class="steps">${items.map(([title, description]) => `
  <li>
  <h3>${escape(title)}</h3><p>${escape(description)}</p></li>`).join('')}</ol>`;

export const sectionTitle = (label, title, description = '') => `
  <p class="label">${label}</p><h2>${title}</h2>${description ? `<p class="lead">${description}</p>` : ''}`;

export const close = () => `<section class="close"><div class="wrap close-inner">
  <div><p class="label brand-label">${brandSymbol} Seu próximo projeto</p><h2>O que você quer construir?</h2>
  <p>Conte seu objetivo em poucas linhas. O escopo e o orçamento são definidos depois da primeira conversa.</p></div>
  ${quote()}</div></section>`;

export const icon = path => `<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${path}"/></svg>`;
