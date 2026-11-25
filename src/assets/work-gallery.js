const gallery = document.querySelector('[data-work-gallery]');
const controls = gallery.querySelector('.work-controls');
const buttons = [...controls.querySelectorAll('button')];
const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
const canvas = document.createElement('canvas');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let selected = 0;
let art;
let render;
let frame = 0;
let assembly;
let pointerX = 0;
let pointerY = 0;

function resetTilt() {
  cancelAnimationFrame(frame);
  frame = 0;
  assembly.style.removeProperty('--work-tilt');
}

function updateTilt() {
  frame = 0;
  const bounds = art.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;
  const across = (pointerX - bounds.left) / bounds.width - .5;
  const down = (pointerY - bounds.top) / bounds.height - .5;
  assembly.style.setProperty('--work-tilt', `rotateX(${-down * 8}deg) rotateY(${across * 15}deg)`);
}

function draw() {
  if (!render) return;
  render(art.clientWidth, art.clientHeight, selected);
  art.classList.add('is-rendered');
}
const resize = new ResizeObserver(draw);
function select(index) {
  if (art && selected === index) return;
  if (art) {
    resize.unobserve(art);
    art.classList.remove('is-rendered');
    resetTilt();
  }
  selected = index;
  buttons.forEach((button, i) => {
    button.setAttribute('aria-pressed', String(i === index));
    panels[i].hidden = i !== index;
  });
  art = panels[index].querySelector('.work-visual');
  assembly = art.querySelector('.work-assembly');
  if (render) art.prepend(canvas);
  resize.observe(art);
  draw();
}
buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
select(0);
controls.hidden = false;
gallery.classList.add('is-active');

for (const panel of panels) {
  const surface = panel.querySelector('.work-visual');
  surface.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches || document.documentElement.hasAttribute('data-motion-paused')) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!frame) frame = requestAnimationFrame(updateTilt);
  });
  surface.addEventListener('pointerleave', resetTilt);
  surface.addEventListener('pointercancel', resetTilt);
}
reducedMotion.addEventListener('change', resetTilt);
canvas.addEventListener('webglcontextlost', () => { render = undefined; art.classList.remove('is-rendered'); });
const observer = new IntersectionObserver(async ([entry]) => {
  if (!entry.isIntersecting) return;
  observer.disconnect();
  try {
    const { createStage } = await import('./work-stage.js');
    render = createStage(canvas);
    art.prepend(canvas);
    draw();
  } catch {
    render = undefined;
    canvas.remove();
  }
}, { rootMargin: '200px' });
observer.observe(gallery);
