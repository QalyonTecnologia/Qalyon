const section = document.querySelector('[data-ecosystem]');
const controls = section.querySelector('[data-ecosystem-controls]');
const buttons = [...controls.querySelectorAll('button')];
const panels = buttons.map(button => document.getElementById(button.getAttribute('aria-controls')));
const stage = section.querySelector('[data-ecosystem-stage]');
const surface = stage.querySelector('[data-ecosystem-render]');
const canvas = surface.querySelector('canvas');
const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const constrain = (value, limit) => Math.max(-limit, Math.min(limit, value));

let selected = -1;
let scene;
let observer;
let inView = false;
let frame = 0;
let lastFrame = 0;
let yaw = 0;
let pitch = 0;
let hoverYaw = 0;
let hoverPitch = 0;
let gesture;

const motionPaused = () => reduced.matches || root.hasAttribute('data-motion-paused');
const visible = () => inView && !document.hidden;

function stop() {
  cancelAnimationFrame(frame);
  frame = 0;
  lastFrame = 0;
}

function draw(now) {
  const delta = lastFrame ? (now - lastFrame) / 1000 : 1 / 60;
  lastFrame = now;
  const moving = scene.draw(delta, pitch + hoverPitch, yaw + hoverYaw, motionPaused(), gesture?.moved === true);
  if (moving && visible()) frame = requestAnimationFrame(draw);
  else stop();
}

function refresh(immediate = false) {
  if (!scene || !visible()) return;
  if (immediate || motionPaused()) {
    stop();
    scene.draw(0, pitch + hoverPitch, yaw + hoverYaw, true);
  } else if (!frame) {
    frame = requestAnimationFrame(draw);
  }
}

function select(index, immediate = false) {
  if (selected === index) return;
  selected = index;
  stage.dataset.active = String(index);
  buttons.forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === index));
    panels[position].hidden = position !== index;
  });
  scene?.select(index);
  refresh(immediate);
}

buttons.forEach((button, index) => button.addEventListener('click', event => select(index, event.detail === 0)));
select(0, true);
controls.hidden = false;

function fallback() {
  stop();
  observer?.disconnect();
  scene?.dispose();
  scene = undefined;
  stage.classList.remove('has-scene');
  surface.removeAttribute('tabindex');
  surface.removeAttribute('role');
  surface.removeAttribute('aria-label');
  delete surface.dataset.dragging;
}

if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (visible()) refresh();
    else stop();
  }).observe(surface);

  const preload = new IntersectionObserver(async ([entry]) => {
    if (!entry.isIntersecting) return;
    preload.disconnect();
    try {
      const { createEcosystemScene } = await import('./ecosystem-scene.js?v=4');
      scene = createEcosystemScene(canvas);
      if (!scene) return;
      scene.select(selected);
      scene.resize(surface.clientWidth, surface.clientHeight);
      scene.draw(0, pitch, yaw, true);
      stage.classList.add('has-scene');
      surface.tabIndex = 0;
      surface.setAttribute('role', 'group');
      surface.setAttribute('aria-label', 'Modelo 3D. Use as setas para girar ou Escape para voltar à posição inicial.');
      observer = new ResizeObserver(() => {
        scene?.resize(surface.clientWidth, surface.clientHeight);
        refresh(true);
      });
      observer.observe(surface);
    } catch {
      fallback();
    }
  }, { rootMargin: '220px' });
  preload.observe(surface);
}

surface.addEventListener('pointerdown', event => {
  if (!scene || !event.isPrimary || event.button !== 0) return;
  gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  surface.setPointerCapture(event.pointerId);
});

surface.addEventListener('pointermove', event => {
  if (!scene || !visible()) return;
  if (gesture?.id === event.pointerId) {
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved) {
      const distance = Math.hypot(dx, dy);
      if (distance < 6) return;
      // Start from the pose already visible and absorb the click/drag dead zone.
      const orbit = scene.getOrbit();
      gesture.pitch = orbit.pitch;
      gesture.yaw = orbit.yaw;
      gesture.x += dx * 6 / distance;
      gesture.y += dy * 6 / distance;
      gesture.moved = true;
      hoverPitch = 0;
      hoverYaw = 0;
      surface.dataset.dragging = '';
    }
    yaw = constrain(gesture.yaw + (event.clientX - gesture.x) * .004, .70);
    pitch = constrain(gesture.pitch + (event.clientY - gesture.y) * .003, .27);
  } else {
    if (event.pointerType !== 'mouse' || motionPaused()) return;
    const bounds = surface.getBoundingClientRect();
    hoverYaw = ((event.clientX - bounds.left) / bounds.width - .5) * .105;
    hoverPitch = ((event.clientY - bounds.top) / bounds.height - .5) * .058;
  }
  refresh();
});

surface.addEventListener('pointerleave', () => {
  hoverYaw = 0;
  hoverPitch = 0;
  refresh();
});

function finishGesture(event) {
  if (gesture?.id !== event.pointerId) return;
  const clicked = event.type === 'pointerup' && !gesture.moved;
  gesture = undefined;
  delete surface.dataset.dragging;
  if (!clicked) return;
  const index = scene?.pick(event.clientX, event.clientY);
  if (index !== undefined) select(index);
}
surface.addEventListener('pointerup', finishGesture);
surface.addEventListener('pointercancel', finishGesture);
surface.addEventListener('lostpointercapture', finishGesture);

surface.addEventListener('keydown', event => {
  if (!scene) return;
  const yawKeys = { ArrowLeft: -.12, ArrowRight: .12 };
  const pitchKeys = { ArrowUp: -.09, ArrowDown: .09 };
  const dx = yawKeys[event.key] ?? 0;
  const dy = pitchKeys[event.key] ?? 0;
  if (!dx && !dy && event.key !== 'Escape') return;
  event.preventDefault();
  yaw = event.key === 'Escape' ? 0 : constrain(yaw + dx, .70);
  pitch = event.key === 'Escape' ? 0 : constrain(pitch + dy, .27);
  hoverPitch = 0;
  hoverYaw = 0;
  refresh(true);
});

canvas.addEventListener('webglcontextlost', fallback);
function motionChanged() {
  hoverYaw = 0;
  hoverPitch = 0;
  if (visible()) refresh(motionPaused());
  else stop();
}
reduced.addEventListener('change', motionChanged);
document.addEventListener('visibilitychange', motionChanged);
new MutationObserver(motionChanged).observe(root, { attributes: true, attributeFilter: ['data-motion-paused'] });
