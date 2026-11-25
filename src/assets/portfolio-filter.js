const catalog = document.querySelector('[data-project-catalog]');
const filters = catalog.querySelector('.portfolio-index');
const buttons = filters.querySelectorAll('[data-portfolio-filter]');
const areas = catalog.querySelectorAll('[data-portfolio-area]');

for (const button of buttons) {
  button.addEventListener('click', () => {
    const selected = button.dataset.portfolioFilter;
    for (const option of buttons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    for (const area of areas) {
      area.hidden = selected !== 'todos' && area.dataset.portfolioArea !== selected;
    }
  });
}
filters.hidden = false;
