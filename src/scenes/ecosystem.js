import { Box, Camera, Mesh, Program, Renderer, Transform } from 'ogl';

const vertex = `
  attribute vec3 position, normal;
  uniform mat4 modelViewMatrix, projectionMatrix;
  uniform mat3 normalMatrix;
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = `
  precision mediump float;
  uniform vec3 tint;
  varying vec3 vNormal;
  void main() {
    vec3 n = normalize(vNormal);
    float light = max(0.0, dot(n, normalize(vec3(-0.4, 0.8, 0.6))));
    gl_FragColor = vec4(tint * (0.48 + light * 0.58), 1.0);
  }
`;

export function createEcosystemScene(canvas) {
  const renderer = new Renderer({
    canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    powerPreference: 'low-power',
  });
  const { gl } = renderer;
  gl.clearColor(0, 0, 0, 0);
  const scene = new Transform();
  const model = new Transform();
  model.setParent(scene);

  const camera = new Camera(gl, { fov: 32, near: 0.1, far: 100 });
  camera.position.set(6.4, 8.5, 9.9);
  camera.lookAt([0, -.30, 0]);
  const box = new Box(gl);
  const color = {
    base: [.09, .14, .135], trim: [.19, .30, .225], dark: [.10, .16, .15],
    surface: [.23, .35, .27], white: [.77, .85, .80], lime: [.71, .95, .10],
    muted: [.37, .53, .37],
  };
  const materials = Object.fromEntries(Object.entries(color).map(([name, tint]) => [
    name, new Program(gl, { vertex, fragment, uniforms: { tint: { value: tint } } }),
  ]));

  function slab(parent, material, x, y, z, width, height, depth) {
    const mesh = new Mesh(gl, { geometry: box, program: materials[material] });
    mesh.position.set(x, y, z);
    mesh.scale.set(width, height, depth);
    mesh.setParent(parent);
    return mesh;
  }

  function circuit(x1, z1, x2, z2) {
    const length = Math.hypot(x2 - x1, z2 - z1);
    const trace = slab(model, 'muted', (x1 + x2) / 2, -.38, (z1 + z2) / 2, length, .009, .033);
    trace.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  }

  slab(model, 'base', 0, -.66, 0, 5.55, .24, 5.55);
  slab(model, 'trim', 0, -.51, 0, 5.47, .05, 5.47);
  slab(model, 'dark', 0, -.45, 0, 5.36, .10, 5.36);

  for (const sign of [-1, 1]) {
    slab(model, 'muted', 0, -.38, sign * 2.57, 5.15, .012, .024);
    slab(model, 'muted', sign * 2.57, -.38, 0, .024, .012, 5.15);
    for (let index = 0; index < 6; index++) {
      slab(model, 'lime', -2.18 + index * .19, -.51, sign * 2.75, .09, .036, .025);
    }
  }

  const stations = [[0, 0], [-1.61, -1.59], [1.63, -1.59], [-1.61, 1.59], [1.63, 1.59]];
  for (const [x, z] of stations.slice(1)) {
    circuit(0, 0, x, 0);
    circuit(x, 0, x, z);
    slab(model, 'lime', x, -.367, 0, .09, .018, .09);
  }

  const designs = [
    // Browser with a hero block and two content columns.
    [[0, -.48, 1.22, .12, 'lime'], [-.3, -.12, .53, .44, 'surface'], [.31, -.16, .47, .13, 'white'], [.26, .09, .37, .10, 'muted'], [0, .43, 1.14, .15, 'surface']],
    // Portfolio gallery.
    [[-.37, -.28, .46, .35, 'lime'], [.32, -.28, .64, .35, 'surface'], [-.37, .25, .46, .35, 'surface'], [.32, .25, .64, .35, 'white']],
    // Offer headline and a conversion button.
    [[0, -.32, .99, .14, 'white'], [0, -.07, .79, .11, 'muted'], [0, .31, .69, .25, 'lime']],
    // Application dashboard with navigation and a chart.
    [[-.46, 0, .26, .92, 'surface'], [-.07, .24, .15, .34, 'muted'], [.18, .15, .15, .51, 'white'], [.43, .02, .15, .76, 'lime']],
    // Atlas service workflow.
    [[0, 0, 1.2, .06, 'muted'], [-.48, 0, .21, .31, 'white'], [-.16, 0, .21, .31, 'white'], [.16, 0, .21, .31, 'lime'], [.48, 0, .21, .31, 'lime']],
  ];

  const modules = designs.map(design => {
    const group = new Transform();
    group.setParent(model);
    slab(group, 'trim', 0, .04, 0, 1.69, .11, 1.37);
    slab(group, 'muted', 0, .13, 0, 1.62, .06, 1.30);
    slab(group, 'base', 0, .23, 0, 1.62, .14, 1.30);
    const edge = slab(group, 'lime', 0, .30, 0, 1.59, .035, 1.27);
    slab(group, 'dark', 0, .34, 0, 1.49, .05, 1.17);
    for (const [x, z, width, depth, ink] of design) {
      slab(group, ink, x, .39, z, width, .048, depth);
    }
    return { group, edge };
  });

  return {
    resize(width, height) {
      renderer.setSize(width, height);
      const aspect = width / height;
      const fitWidth = Math.atan(Math.tan(33 * Math.PI / 360) * 1.25 / aspect) * 360 / Math.PI;
      camera.perspective({ aspect, fov: Math.max(33, fitWidth) });
    },
    render(selected, time, pointer, snap) {
      model.rotation.y = Math.sin(time * .62) * .11 + pointer[0] * .16;
      model.rotation.x = pointer[1] * .08;
      const ease = snap ? 1 : .12;
      let station = 1;
      modules.forEach(({ group, edge }, index) => {
        const active = selected === index;
        const [x, z] = stations[active ? 0 : station++];
        const y = active ? .74 + Math.sin(time * 1.5) * .12 : -.29;
        group.position.x += (x - group.position.x) * ease;
        group.position.y += (y - group.position.y) * ease;
        group.position.z += (z - group.position.z) * ease;
        const size = group.scale.x + ((active ? 1.46 : .89) - group.scale.x) * ease;
        group.scale.set(size, size, size);
        edge.program = materials[active ? 'lime' : 'surface'];
      });
      renderer.render({ scene, camera });
    },
  };
}
