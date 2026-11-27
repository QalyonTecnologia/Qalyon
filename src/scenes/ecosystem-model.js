import { BoxGeometry, Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const colors = {
  base: '#172521', trim: '#405b49', dark: '#20322c', surface: '#426453',
  white: '#d4e7da', lime: '#b6f21a', muted: '#68866b',
};

export function createEcosystemModel() {
  const model = new Group();
  const box = new BoxGeometry();
  const beveled = new RoundedBoxGeometry(1, 1, 1, 2, .075);
  const materials = Object.fromEntries(Object.entries(colors).map(([name, color]) => [
    name, new MeshStandardMaterial({
      color,
      roughness: name === 'base' ? .43 : .64,
      metalness: name === 'base' || name === 'trim' ? .20 : .08,
      ...(name === 'lime' ? { emissive: '#9be517', emissiveIntensity: .26 } : {}),
    }),
  ]));

  function slab(parent, material, x, y, z, width, height, depth) {
    const geometry = height > .045 && width > .14 && depth > .14 ? beveled : box;
    const mesh = new Mesh(geometry, materials[material]);
    mesh.position.set(x, y, z);
    mesh.scale.set(width, height, depth);
    parent.add(mesh);
    return mesh;
  }

  function circuit(x1, z1, x2, z2) {
    const length = Math.hypot(x2 - x1, z2 - z1);
    const trace = slab(model, 'muted', (x1 + x2) / 2, -.38, (z1 + z2) / 2, length, .009, .033);
    trace.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  }

  slab(model, 'base', 0, -.66, 0, 5.55, .24, 5.55).receiveShadow = true;
  slab(model, 'trim', 0, -.51, 0, 5.47, .05, 5.47);
  slab(model, 'dark', 0, -.45, 0, 5.36, .10, 5.36).receiveShadow = true;

  for (const sign of [-1, 1]) {
    slab(model, 'muted', 0, -.38, sign * 2.57, 5.15, .012, .024);
    slab(model, 'muted', sign * 2.57, -.38, 0, .024, .012, 5.15);
    for (let index = 0; index < 6; index++) {
      slab(model, 'lime', -2.18 + index * .19, -.51, sign * 2.75, .09, .036, .025);
    }
  }

  const stations = [[0, 0], [-1.61, -1.59], [1.63, -1.59], [-1.61, 1.59], [1.63, 1.59]];
  for (const x of [-1.61, 1.63]) circuit(0, 0, x, 0);
  for (const [x, z] of stations.slice(1)) {
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
    const group = new Group();
    model.add(group);
    slab(group, 'trim', 0, .04, 0, 1.69, .11, 1.37);
    slab(group, 'muted', 0, .13, 0, 1.62, .06, 1.30);
    slab(group, 'base', 0, .23, 0, 1.62, .14, 1.30).castShadow = true;
    const edge = slab(group, 'lime', 0, .30, 0, 1.59, .035, 1.27);
    slab(group, 'dark', 0, .34, 0, 1.49, .05, 1.17);
    for (const [x, z, width, depth, ink] of design) {
      slab(group, ink, x, .39, z, width, .048, depth);
    }
    return { group, edge };
  });

  function select(index) {
    let station = 1;
    modules.forEach((module, position) => {
      const active = position === index;
      const [x, z] = stations[active ? 0 : station++];
      module.target = new Vector3(x, active ? .74 : -.29, z);
      module.scale = active ? 1.46 : .89;
      module.edge.material = materials[active ? 'lime' : 'surface'];
    });
  }

  function update(factor) {
    let moving = false;
    for (const { group, target, scale } of modules) {
      const distance = Math.hypot(group.position.x - target.x, group.position.z - target.z);
      const lift = factor === 1 || distance < .04 ? 0 : Math.min(.40, distance * .22);
      group.position.x += (target.x - group.position.x) * factor;
      group.position.y += (target.y + lift - group.position.y) * factor;
      group.position.z += (target.z - group.position.z) * factor;
      group.scale.setScalar(group.scale.x + (scale - group.scale.x) * factor);
      moving ||= group.position.distanceToSquared(target) > .00004 || Math.abs(group.scale.x - scale) > .004;
    }
    return moving;
  }

  modules.forEach(({ group }, index) => { group.userData.solution = index; });

  function dispose() {
    box.dispose();
    beveled.dispose();
    for (const material of Object.values(materials)) material.dispose();
  }

  return { model, modules, select, update, dispose };
}
