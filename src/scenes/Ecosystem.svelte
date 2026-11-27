<script>
  import { Canvas } from '@threlte/core';
  import { NoToneMapping, WebGLRenderer } from 'three';
  import Scene from './EcosystemScene.svelte';

  let { input, onReady, onFailure } = $props();

  function createRenderer(canvas) {
    const options = { alpha: true, antialias: true, powerPreference: 'low-power' };
    const context = canvas.getContext('webgl2', options);
    if (!context) throw new Error('WebGL 2 indisponível');
    return new WebGLRenderer({ canvas, context, ...options });
  }
</script>

<svelte:boundary onerror={onFailure}>
  <Canvas {createRenderer} renderMode="on-demand" dpr={[1, 1.4]} shadows={false} toneMapping={NoToneMapping}>
    <Scene {input} {onReady} {onFailure} />
  </Canvas>
</svelte:boundary>
