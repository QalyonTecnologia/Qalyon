import {
  DirectionalLight, HemisphereLight, NoToneMapping, OrthographicCamera,
  PCFShadowMap, Raycaster, Scene, Vector2, WebGLRenderer,
} from 'three';
import { createEcosystemModel } from './ecosystem-model.js';

export function createEcosystemScene(canvas) {
  const options = { alpha: true, antialias: true, powerPreference: 'low-power' };
  const context = canvas.getContext('webgl2', options);
  if (!context) return null;

  const renderer = new WebGLRenderer({ canvas, context, ...options });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setClearColor(0, 0);
  renderer.toneMapping = NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const camera = new OrthographicCamera(-5, 5, 4, -4, .1, 45);
  camera.position.set(6.4, 8.5, 9.9);
  camera.lookAt(0, .08, 0);

  scene.add(new HemisphereLight('#e6f9e8', '#63866e', 1.18));
  const key = new DirectionalLight('#e7ffef', 2.1);
  key.position.set(-3.8, 7.2, 5.5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -5.5, right: 5.5, top: 5.5, bottom: -5.5, near: .5, far: 19 });
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.normalBias = .028;
  key.shadow.bias = -.00025;
  scene.add(key);

  const rim = new DirectionalLight('#b1e999', 1.25);
  rim.position.set(4, 3, -5);
  scene.add(rim);

  const board = createEcosystemModel();
  scene.add(board.model);
  const ray = new Raycaster();
  const point = new Vector2();
  const velocity = new Vector2();
  const rotation = board.model.rotation;

  // A critically damped spring keeps its velocity when the pointer changes direction.
  function rotateAxis(axis, target, elapsed, response) {
    const offset = rotation[axis] - target;
    const drift = velocity[axis] + response * offset;
    const decay = Math.exp(-response * elapsed);
    const remaining = (offset + drift * elapsed) * decay;
    const speed = (velocity[axis] - response * drift * elapsed) * decay;
    const settled = Math.abs(remaining) < .00025 && Math.abs(speed) < .006;
    rotation[axis] = settled ? target : target + remaining;
    velocity[axis] = settled ? 0 : speed;
    return !settled;
  }

  function resize(width, height) {
    const aspect = width / height;
    const span = Math.max(6.6, 8.65 / aspect);
    camera.left = -span * aspect / 2;
    camera.right = -camera.left;
    camera.top = span / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function draw(delta, pitch, yaw, immediate, dragging = false) {
    const elapsed = Math.min(delta, .05);
    const response = dragging ? 32 : 20;
    let rotating = false;
    if (immediate) {
      rotation.x = pitch;
      rotation.y = yaw;
      velocity.set(0, 0);
    } else {
      const pitchMoving = rotateAxis('x', pitch, elapsed, response);
      const yawMoving = rotateAxis('y', yaw, elapsed, response);
      rotating = pitchMoving || yawMoving;
    }
    const moving = board.update(immediate ? 1 : 1 - Math.exp(-15 * elapsed));
    renderer.render(scene, camera);
    return moving || rotating;
  }

  const getOrbit = () => ({ pitch: rotation.x, yaw: rotation.y });

  function pick(clientX, clientY) {
    const bounds = canvas.getBoundingClientRect();
    point.set((clientX - bounds.left) / bounds.width * 2 - 1, 1 - (clientY - bounds.top) / bounds.height * 2);
    ray.setFromCamera(point, camera);
    const nearest = ray.intersectObjects(board.model.children, true)[0]?.object;
    return nearest?.parent.userData.solution;
  }

  function dispose() {
    board.dispose();
    key.shadow.map?.dispose();
    renderer.dispose();
  }

  return { draw, resize, getOrbit, select: board.select, pick, dispose };
}
