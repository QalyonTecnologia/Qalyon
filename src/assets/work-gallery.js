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

function draw() {
  if (!render) return;
  render(art.clientWidth, art.clientHeight, selected);
  art.classList.add('is-rendered');
}
const resize = new ResizeObserver(draw);
function select(index) {
  if (art) {
    resize.unobserve(art);
    art.classList.remove('is-rendered');
    art.style.removeProperty('--yaw');
  }
  selected = index;
  buttons.forEach((button, i) => {
    button.setAttribute('aria-pressed', String(i === index));
    panels[i].hidden = i !== index;
  });
  art = panels[index].querySelector('.work-art');
  if (render) art.prepend(canvas);
  resize.observe(art);
  draw();
}
buttons.forEach((button, i) => button.addEventListener('click', () => select(i)));
select(0);
controls.hidden = false;
gallery.classList.add('is-active');

gallery.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || reducedMotion.matches || document.documentElement.hasAttribute('data-motion-paused')) return;
  if (!art.contains(event.target)) { art.style.removeProperty('--yaw'); return; }
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    const box = art.getBoundingClientRect();
    const offset = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
    art.style.setProperty('--yaw', offset * 15 + 'deg');
    frame = 0;
  });
});
gallery.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); frame = 0; art.style.removeProperty('--yaw'); });
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
