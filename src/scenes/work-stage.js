import { Camera, Cylinder, Mesh, Program, Renderer, Torus, Transform } from 'ogl';

export function createStage(canvas) {
  const renderer = new Renderer({ canvas, alpha: true, antialias: true, dpr: Math.min(devicePixelRatio, 1.5), powerPreference: 'low-power' });
  const { gl } = renderer;
  gl.clearColor(0, 0, 0, 0);
  const camera = new Camera(gl, { fov: 32 });
  camera.position.set(0, 2.2, 7.7);
  camera.lookAt([0, .05, 0]);
  const stage = new Transform();
  const plinth = new Cylinder(gl, { radiusTop: 1, radiusBottom: 1, radialSegments: 88 });
  const ring = new Torus(gl, { radius: 1, tube: .013, tubularSegments: 100 });
  const vertex = `
    attribute vec3 position, normal;
    uniform mat4 modelViewMatrix, projectionMatrix;
    uniform mat3 normalMatrix;
    varying vec3 N;
    varying vec3 V;
    void main() {
      vec4 pos = modelViewMatrix * vec4(position, 1.0);
      N = normalMatrix * normal;
      V = -pos.xyz;
      gl_Position = projectionMatrix * pos;
    }`;
  const fragment = `
    precision mediump float;
    varying vec3 N;
    varying vec3 V;
    uniform vec3 tint;
    void main() {
      vec3 n = normalize(N);
      vec3 light = normalize(vec3(-.5, .9, .65));
      float diffuse = max(0.,dot(n,light));
      float spec = pow(max(0.,dot(n,normalize(light + normalize(V)))), 22.);
      gl_FragColor = vec4(tint * (.53 + .45 * diffuse) + vec3(.48 * spec), 1.);
    }`;
  function layer(geometry, tint, height, width, depth) {
    const program = new Program(gl, { vertex, fragment, uniforms: { tint: { value: tint } } });
    const mesh = new Mesh(gl, { geometry, program });
    mesh.position.y = height;
    mesh.scale.set(width, depth, width);
    mesh.setParent(stage);
    return mesh;
  }
  layer(plinth, [.24,.26,.29], -1.30, 1.96, .16);
  const rim = layer(plinth, [.68,.83,.57], -1.19, 2.01, .055);
  layer(plinth, [.66,.68,.71], -1.12, 2.04, .11);
  for (const radius of [1.76, 1.91]) {
    const groove = layer(ring, [.46,.48,.51], -1.06, radius, radius);
    groove.rotation.x = Math.PI / 2;
  }
  const pigments = [[.75,.58,.95],[.9,.77,.49],[.48,.86,.69],[.45,.73,.94]];
  return function render(width, height, choice) {
    if (!width || !height) return;
    renderer.setSize(width, height);
    camera.perspective({ aspect: width / height, fov: Math.max(28, 47 * height / width) });
    rim.program.uniforms.tint.value = pigments[choice];
    renderer.render({ scene: stage, camera });
  };
}
