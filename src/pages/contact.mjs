import { contact, services } from '../content.mjs';
import { brandSymbol, escape, heading, icon } from '../components.mjs';

const whatsapp = contact.whatsappBusiness;
if (whatsapp !== null && !/^55[1-9]\d{9,10}$/.test(whatsapp)) {
  throw new Error('Informe o número oficial brasileiro em formato internacional.');
}
const whatsappUrl = whatsapp ? 'https://wa.me/' + whatsapp : '';
if (!/^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(contact.email)) {
  throw new Error('Informe o endereço oficial de atendimento.');
}
const emailUrl = 'mailto:' + contact.email;

export const contactPage = `
<section class="quote-intro">
  <div class="wrap quote-hero-layout">
    <div class="quote-hero-copy">
      ${heading('Contato comercial', 'Solicitar orçamento.',
        'Conte o que você quer colocar no ar, melhorar ou automatizar. Vamos entender seu projeto e preparar uma proposta de acordo com o escopo.')}
      <div class="actions">
        <a class="button" href="#briefing">Preencher briefing</a>
        <a class="arrow-link" href="#canais-contato">Ver canais de contato</a>
      </div>
    </div>
    <div class="quote-hero-art" aria-hidden="true">
      <div class="quote-hero-grid"></div>
      <div class="quote-hero-orbit"></div>
      <div class="quote-hero-stack">
        <div class="quote-hero-sheet quote-hero-sheet--back"></div>
        <div class="quote-hero-sheet quote-hero-sheet--main">
          <div class="quote-hero-sheet-heading">${brandSymbol}<strong>Briefing de projeto</strong></div>
          <div class="quote-hero-line"></div><div class="quote-hero-line quote-hero-line--short"></div>
          <div class="quote-hero-textarea"></div>
        </div>
        <div class="quote-hero-message">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</div>
      </div>
    </div>
  </div>
</section>
<section class="wrap section compact quote-layout">
  <div class="contact-panel quote-panel" id="briefing">
    <div class="quote-panel-heading">
      <div><p class="label">Briefing inicial</p><h2>Conte sobre seu projeto</h2></div>
    </div>
    <p id="form-status">Preencha os campos obrigatórios. Se ainda estiver definindo o projeto, deixe os detalhes opcionais em branco.</p>
    <form id="quote-form" data-whatsapp-url="${escape(whatsappUrl)}" data-email-url="${escape(emailUrl)}" aria-describedby="form-status">
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
            ${services.map(service => `<option value="${escape(service.slug)}">${escape(service.title)}</option>`).join('')}
            <option value="a-definir">Ainda preciso definir</option>
          </select></div>
          <div><label for="stage">Momento do projeto <small>Opcional</small></label><select id="stage" name="stage">
            <option value="">Selecione, se souber</option>
            <option>Começar do zero</option><option>Melhorar algo existente</option><option>Substituir uma solução</option>
          </select></div>
          <div class="quote-wide"><label for="goal">O que você quer alcançar?</label><textarea id="goal" name="goal" minlength="10" maxlength="800" rows="4" placeholder="Ex.: Quero apresentar meus serviços e receber pedidos de orçamento." aria-describedby="goal-help" required></textarea><small class="quote-help" id="goal-help">Conte seu objetivo sem incluir senhas, documentos ou dados sensíveis.</small></div>
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
        <p>O briefing é montado no seu navegador. <a href="/privacidade/">Veja como seus dados são usados</a>.</p>
        <button class="button" id="quote-review" type="submit" disabled>Revisar briefing</button>
      </div>
      <noscript><p>Ative o JavaScript para montar o resumo do briefing.</p></noscript>
    </form>
    <dialog class="quote-dialog" id="quote-dialog" aria-labelledby="quote-dialog-title">
      <h2 id="quote-dialog-title">Confira seu briefing</h2>
      <p>${whatsappUrl ? 'Copie o resumo ou abra um rascunho no WhatsApp ou no e-mail. Revise antes de enviar.' : 'Copie o resumo ou abra um rascunho no seu aplicativo de e-mail. Revise antes de enviar.'}</p>
      <label for="quote-summary">Resumo do projeto</label>
      <textarea id="quote-summary" rows="9" readonly></textarea>
      <div class="quote-dialog-actions">
        ${whatsappUrl ? '<a class="button" id="quote-send" rel="noreferrer">Abrir briefing no WhatsApp</a>' : ''}
        <a class="button quote-secondary" id="quote-email">Abrir briefing no e-mail</a>
        <button class="button quote-secondary" id="quote-copy" type="button">Copiar briefing</button>
        <button class="button quote-secondary" id="quote-close" type="button">Voltar ao formulário</button>
      </div>
      <p class="quote-copy-status" id="quote-copy-status" role="status"></p>
    </dialog>
  </div>
  <aside class="quote-sidebar" id="canais-contato" aria-label="Canais e próximos passos">
    <div class="quote-channel glass">
      <span class="holo-icon">${icon('M7 10h34v24H20l-9 6v-6H7z M14 19h20 M14 25h15')}</span>
      <h2>Prefere conversar?</h2>
      <p>Conte sua ideia diretamente pelo canal de atendimento.</p>
      ${whatsappUrl ? `<a class="button" href="${whatsappUrl}">Conversar no WhatsApp</a>` : ''}
      <a class="${whatsappUrl ? 'arrow-link' : 'button'}" href="${emailUrl}">Enviar e-mail</a>
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
</section>`;
