<script>
  import { T, useTask, useThrelte } from '@threlte/core';
  import { onDestroy, onMount } from 'svelte';
  import { Group, MathUtils, OrthographicCamera } from 'three';
  import { createModels } from './ecosystem-models.js';

  let { input, onReady, onFailure } = $props();
  const { canvas, invalidate, renderer, size } = useThrelte();
  const assets = createModels();
  const rig = new Group();
  rig.add(assets.stage, ...assets.models);
  const view = new OrthographicCamera(-4, 4, 3, -3, .1, 40);
  view.position.set(5.7, 4.4, 10);
  view.lookAt(0, .95, 0);
  let active = -1;
  let model;
  let pose = 0;
  let lastPointer = [0, 0];

  $effect(() => {
    const { width, height } = $size;
    if (!width || !height) return;
    const aspect = width / height;
    const vertical = Math.max(4.75, 6.85 / aspect);
    view.top = vertical / 2;
    view.bottom = -view.top;
    view.right = view.top * aspect;
    view.left = -view.right;
    view.updateProjectionMatrix();
    invalidate();
  });

  function apply(pointer) {
    rig.rotation.set(pointer[1] * .062, pointer[0] * .15, 0);
    model.position.set(.34 * pose, .11 * pose, 0);
    model.rotation.y = -.19 * pose;
    model.scale.setScalar(1 - .08 * Math.abs(pose));
    invalidate();
  }

  const task = useTask(delta => {
    const damping = 1 - Math.exp(-Math.min(delta, .05) * 18);
    pose = MathUtils.lerp(pose, 0, damping);
    const target = $input.pointer;
    lastPointer = lastPointer.map((value, index) => MathUtils.lerp(value, target[index], damping));
    const settled = Math.abs(pose) < .007 && lastPointer.every((value, index) => Math.abs(value - target[index]) < .005);
    if (settled) {
      pose = 0;
      lastPointer = target;
      task.stop();
    }
    apply(lastPointer);
  }, { autoStart: false, autoInvalidate: false });

  $effect(() => {
    const { index, animate, pointer, visible, immediate } = $input;
    if (index !== active) {
      pose = active < 0 ? 0 : Math.sign(index - active);
      active = index;
      assets.models.forEach((item, position) => { item.visible = position === index; });
      model = assets.models[index];
    }
    if (!animate || immediate) {
      pose = 0;
      lastPointer = [0, 0];
      task.stop();
      apply(lastPointer);
    } else if (visible && (pose !== 0 || lastPointer.some((value, i) => value !== pointer[i]))) {
      apply(lastPointer);
      task.start();
    }
    if (!visible) task.stop();
    invalidate();
  });

  onMount(() => {
    if (renderer.getContext().isContextLost()) {
      onFailure();
      return;
    }
    function lost() {
      task.stop();
      onFailure();
    }
    canvas.addEventListener('webglcontextlost', lost, { once: true });
    onReady();
    return () => canvas.removeEventListener('webglcontextlost', lost);
  });
  onDestroy(assets.dispose);
</script>

<T is={view} makeDefault manual />
<T.AmbientLight intensity={1.2} />
<T.DirectionalLight color="#e5fff3" position={[-3, 6, 6]} intensity={2.05} />
<T.DirectionalLight color="#badb8b" position={[5, 3, -5]} intensity={1.75} />
<T is={rig} dispose={false} />
