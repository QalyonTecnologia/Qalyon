import {
  BoxGeometry, CircleGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial,
  RingGeometry, SphereGeometry,
} from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function createModels() {
  const box = new BoxGeometry();
  const roundedBox = new RoundedBoxGeometry(1, 1, 1, 2, .08);
  const circle = new CircleGeometry(1, 32);
  const ring = new RingGeometry(.88, 1, 48);
  const sphere = new SphereGeometry(1, 16, 12);
  const metal = new MeshStandardMaterial({ color: '#202928', roughness: .46, metalness: .25 });
  const edge = new MeshStandardMaterial({ color: '#52635a', roughness: .51, metalness: .19 });
  const ink = {
    night: '#111b1b', green: '#27453e', mist: '#96b0a5', lime: '#b6f21a',
    paper: '#e2eae0', lilac: '#b9afd6', plum: '#443a56', sand: '#d1a689', rust: '#663e37',
  };
  const colors = Object.fromEntries(Object.entries(ink).map(([key, color]) => [key, new MeshBasicMaterial({ color })]));

  function mesh(parent, geometry, material, position, scale) {
    const item = new Mesh(geometry, material);
    item.position.set(...position);
    item.scale.set(...scale);
    parent.add(item);
    return item;
  }

  function group(parent, x, y, z, angle = 0) {
    const item = new Group();
    item.position.set(x, y, z);
    item.rotation.y = angle;
    parent.add(item);
    return item;
  }

  function block(parent, x, y, z, width, height, depth, material, rounded = false) {
    return mesh(parent, rounded ? roundedBox : box, material, [x, y, z], [width, height, depth]);
  }

  function panel(parent, x, z, bottom, width, height, angle = 0) {
    const item = group(parent, x, bottom + height / 2, z, angle);
    block(item, 0, 0, 0, width, height, .19, metal, true);
    block(item, 0, 0, .102, width - .11, height - .11, .025, edge, true);
    block(item, 0, 0, .123, width - .20, height - .20, .025, colors.night, true);
    return item;
  }

  function rect(parent, x, y, width, height, color, z = .15) {
    return block(parent, x, y, z, width, height, .012, colors[color], true);
  }

  function disc(parent, x, y, radius, color, geometry = circle, z = .162) {
    return mesh(parent, geometry, colors[color], [x, y, z], [radius, radius, 1]);
  }

  function toolbar(parent, x, y) {
    for (const [index, color] of ['lime', 'mist', 'green'].entries()) {
      disc(parent, x + index * .105, y, .032, color);
    }
  }

  const stage = new Group();
  block(stage, 0, -.26, 0, 5.45, .32, 3.05, metal, true);
  block(stage, 0, -.115, 0, 5.32, .048, 2.94, edge, true);
  block(stage, 0, -.066, 0, 5.16, .090, 2.78, metal, true);
  block(stage, 0, -.172, 1.52, 1.05, .025, .016, colors.lime);

  const sites = new Group();
  const browser = panel(sites, -.45, -.24, .25, 3.74, 2.41, -.08);
  toolbar(browser, -1.58, .90);
  rect(browser, 0, .77, 3.4, .023, 'green');
  rect(browser, .69, .17, 1.72, .95, 'green');
  disc(browser, .94, .30, .27, 'mist');
  rect(browser, -1.02, .47, 1.10, .13, 'paper');
  rect(browser, -1.12, .21, .91, .055, 'mist');
  rect(browser, -1.26, -.08, .61, .18, 'lime');
  for (const x of [-1.07, 0, 1.07]) rect(browser, x, -.66, .9, .32, 'green');
  const phone = panel(sites, 1.55, .62, .06, .93, 1.72, .17);
  rect(phone, 0, .43, .61, .37, 'green');
  rect(phone, 0, .07, .51, .08, 'paper');
  rect(phone, 0, -.14, .44, .06, 'mist');
  rect(phone, 0, -.46, .54, .18, 'lime');

  const portfolios = new Group();
  const editorial = panel(portfolios, -1.37, -.22, .15, 1.36, 2.05, -.29);
  rect(editorial, 0, .18, 1.03, 1.27, 'rust');
  disc(editorial, .19, .47, .22, 'sand');
  const hillside = rect(editorial, -.11, -.065, .70, .32, 'sand', .17);
  hillside.rotation.z = .51;
  rect(editorial, 0, -.65, .77, .065, 'sand');
  const gallery = panel(portfolios, 1.39, -.21, .15, 1.36, 2.05, .34);
  for (const [x, y, color] of [[-.25, .36, 'green'], [.25, .36, 'mist'], [-.25, -.20, 'mist'], [.25, -.20, 'green']]) {
    rect(gallery, x, y, .42, .47, color);
  }
  rect(gallery, 0, -.67, .74, .065, 'paper');
  const profile = panel(portfolios, 0, .48, .29, 1.68, 2.36, -.01);
  rect(profile, 0, .29, 1.31, 1.24, 'plum');
  disc(profile, 0, .53, .27, 'lilac');
  mesh(profile, sphere, colors.lilac, [0, .023, .166], [.42, .23, .03]);
  rect(profile, 0, -.53, 1.03, .092, 'paper');
  rect(profile, 0, -.79, .65, .135, 'lime');

  const campaigns = new Group();
  const offer = panel(campaigns, -.28, .06, .10, 3.05, 2.54, -.14);
  rect(offer, 0, .30, 2.65, 1.54, 'green');
  disc(offer, .62, .32, .56, 'mist', ring);
  disc(offer, .62, .32, .37, 'lime', ring);
  disc(offer, .62, .32, .12, 'lime');
  rect(offer, -.71, .53, .86, .13, 'paper');
  rect(offer, -.81, .23, .65, .067, 'mist');
  rect(offer, -.79, .014, .69, .062, 'mist');
  rect(offer, 0, -.72, 1.72, .33, 'lime');
  const pointer = group(campaigns, 1.34, .65, .87, -.1);
  block(pointer, 0, 0, 0, .26, .74, .19, colors.paper, true).rotation.z = .45;
  block(pointer, -.075, .14, 0, .5, .21, .19, colors.paper, true).rotation.z = -.26;
  block(pointer, .062, .19, .001, .43, .20, .19, colors.paper, true).rotation.z = 1.05;

  const systems = new Group();
  const board = panel(systems, -.15, -.14, .16, 4.25, 2.47, -.09);
  toolbar(board, -1.85, .94);
  rect(board, 0, .79, 3.88, .026, 'green');
  rect(board, -1.55, -.12, .65, 1.56, 'green');
  for (const y of [.39, .14, -.11, -.36]) rect(board, -1.55, y, .39, .063, y === .39 ? 'lime' : 'mist');
  rect(board, .51, .41, 2.61, .48, 'green');
  rect(board, -.25, .45, .58, .094, 'paper');
  rect(board, 1.26, .45, .53, .093, 'lime');
  rect(board, .51, -.40, 2.61, .98, 'green');
  for (const [index, height] of [.26, .41, .34, .55, .66, .53, .71].entries()) {
    rect(board, -.44 + index * .316, -.79 + height / 2, .18, height, index === 6 ? 'lime' : 'mist', .168);
  }
  const indicator = panel(systems, 1.62, .58, .22, 1.08, .88, .15);
  disc(indicator, 0, .03, .27, 'lime', ring);
  disc(indicator, 0, .03, .092, 'lime');

  const atlas = new Group();
  block(atlas, 0, .038, .16, 4.28, .07, .075, colors.lime, true);
  const steps = [-1.68, -.56, .56, 1.68].map((x, i) => panel(atlas, x, 0, .18 + i * .17, .92, 1.15, -.17));
  for (const [i, step] of steps.entries()) {
    const x = -1.68 + i * 1.12;
    block(atlas, x, .12 + i * .084, .02, .11, .24 + i * .168, .12, edge);
    rect(step, 0, -.29, .53, .066, i === 3 ? 'lime' : 'mist');
  }
  for (const [i, y] of [.22, .075, -.07].entries()) rect(steps[0], i === 2 ? -.08 : 0, y, i === 2 ? .31 : .49, .052, 'paper');
  rect(steps[1], 0, .073, .49, .37, 'mist');
  rect(steps[1], 0, .024, .40, .21, 'night', .169);
  disc(steps[1], .087, .017, .042, 'lime', circle, .181);
  rect(steps[2], -.04, -.015, .33, .08, 'lime').rotation.z = -.6;
  rect(steps[2], .082, .07, .45, .08, 'lime').rotation.z = .78;
  rect(steps[3], 0, .073, .53, .37, 'lime');
  rect(steps[3], 0, .11, .48, .07, 'green', .169);

  return {
    stage,
    models: [sites, portfolios, campaigns, systems, atlas],
    dispose() {
      for (const geometry of [box, roundedBox, circle, ring, sphere]) geometry.dispose();
      for (const material of [metal, edge, ...Object.values(colors)]) material.dispose();
    },
  };
}
