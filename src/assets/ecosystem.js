const section = document.querySelector('[data-ecosystem]');
const controls = section.querySelector('[data-ecosystem-controls]');
const buttons = [...controls.querySelectorAll('button')];
const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
const stage = section.querySelector('[data-ecosystem-stage]');
const renderArea = stage.querySelector('[data-ecosystem-render]');
const target = renderArea.querySelector('[data-ecosystem-viewport]');
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let selected = -1;
let scene;
let visible = false;
let pointer = [0, 0];

function snapshot(immediate = false) {
  const inView = visible && !document.hidden;
  return {
    index: selected,
    animate: inView && !reducedMotion.matches && !root.hasAttribute('data-motion-paused'),
    immediate,
    pointer,
    visible: inView,
  };
}

function sync() {
  scene?.update(snapshot());
}

function select(index, immediate) {
  if (index === selected) return;
  selected = index;
  stage.dataset.active = String(index);
  buttons.forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === index));
    panels[position].hidden = position !== index;
  });
  scene?.update(snapshot(immediate));
}

buttons.forEach((button, index) => button.addEventListener('click', event => select(index, event.detail === 0)));
select(0, true);
controls.hidden = false;

function fallback() {
  stage.classList.remove('has-scene');
  const failedScene = scene;
  scene = undefined;
  failedScene?.dispose();
}

if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) pointer = [0, 0];
    sync();
  }).observe(renderArea);

  const preload = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting) return;
    preload.disconnect();
    try {
      const { createEcosystemScene } = await import('./ecosystem-scene.js');
      scene = createEcosystemScene(target, snapshot(true), () => {
        stage.classList.add('has-scene');
      }, () => queueMicrotask(fallback));
    } catch {
      fallback();
    }
  }, { rootMargin: '200px' });
  preload.observe(renderArea);
}

renderArea.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || !scene || !snapshot().animate) return;
  const bounds = renderArea.getBoundingClientRect();
  pointer = [(event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1];
  sync();
});
renderArea.addEventListener('pointerleave', () => {
  pointer = [0, 0];
  sync();
});

function motionChanged() {
  pointer = [0, 0];
  sync();
}
reducedMotion.addEventListener('change', motionChanged);
document.addEventListener('visibilitychange', motionChanged);
new MutationObserver(motionChanged).observe(root, { attributes: true, attributeFilter: ['data-motion-paused'] });
