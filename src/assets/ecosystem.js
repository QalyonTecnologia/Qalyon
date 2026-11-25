const section = document.querySelector('[data-ecosystem]');
const controls = section.querySelector('[data-ecosystem-controls]');
const buttons = [...controls.querySelectorAll('button')];
const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
const stage = section.querySelector('[data-ecosystem-stage]');
const renderArea = stage.querySelector('[data-ecosystem-render]');
const canvas = renderArea.querySelector('canvas');
const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let selected = 0;
let scene;
let visible = false;
let frame = 0;
let previousTime = 0;
let time = 0;
let pointer = [0, 0];

const canAnimate = () => visible && !document.hidden && !reducedMotion.matches && !root.hasAttribute('data-motion-paused');

function draw(now) {
  if (now - previousTime >= 32) {
    time += Math.min((now - previousTime) / 1000, .05);
    previousTime = now;
    scene.render(selected, time, pointer, false);
  }
  frame = requestAnimationFrame(draw);
}

function sync() {
  if (!scene) return;
  if (canAnimate()) {
    if (!frame) {
      previousTime = performance.now();
      frame = requestAnimationFrame(draw);
    }
  } else {
    cancelAnimationFrame(frame);
    frame = 0;
    if (visible && !document.hidden) scene.render(selected, time, [0, 0], true);
  }
}

function select(index) {
  selected = index;
  stage.dataset.active = String(index);
  buttons.forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === index));
    panels[position].hidden = position !== index;
  });
  sync();
}

buttons.forEach((button, index) => button.addEventListener('click', () => select(index)));
select(0);
controls.hidden = false;

if ('IntersectionObserver' in window) {
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  visibility.observe(stage);

  const preload = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting) return;
    preload.disconnect();
    try {
      const { createEcosystemScene } = await import('./ecosystem-scene.js');
      scene = createEcosystemScene(canvas);
      const resize = () => {
        if (!scene || !renderArea.clientWidth || !renderArea.clientHeight) return;
        scene.resize(renderArea.clientWidth, renderArea.clientHeight);
        scene.render(selected, time, [0, 0], true);
      };
      resize();
      stage.classList.add('has-scene');
      new ResizeObserver(resize).observe(renderArea);
      sync();
    } catch {
      scene = undefined;
    }
  }, { rootMargin: '240px' });
  preload.observe(stage);
}

renderArea.addEventListener('pointermove', event => {
  if (!canAnimate() || event.pointerType === 'touch') return;
  const bounds = renderArea.getBoundingClientRect();
  pointer = [(event.clientX - bounds.left) / bounds.width - .5, (event.clientY - bounds.top) / bounds.height - .5];
});
renderArea.addEventListener('pointerleave', () => { pointer = [0, 0]; });
canvas.addEventListener('webglcontextlost', () => {
  cancelAnimationFrame(frame);
  frame = 0;
  scene = undefined;
  stage.classList.remove('has-scene');
});
reducedMotion.addEventListener('change', sync);
document.addEventListener('visibilitychange', sync);
new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-motion-paused'] });
