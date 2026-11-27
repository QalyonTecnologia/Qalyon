import {
  DirectionalLight, HemisphereLight, MathUtils, NoToneMapping, OrthographicCamera,
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

  function draw(delta, pitch, yaw, immediate) {
    const blend = immediate ? 1 : 1 - Math.exp(-15 * Math.min(delta, .05));
    const rotation = board.model.rotation;
    rotation.x = MathUtils.lerp(rotation.x, pitch, blend);
    rotation.y = MathUtils.lerp(rotation.y, yaw, blend);
    const moving = board.update(blend);
    renderer.render(scene, camera);
    return moving || Math.abs(rotation.x - pitch) > .002 || Math.abs(rotation.y - yaw) > .002;
  }

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

  return { draw, resize, select: board.select, pick, dispose };
}
