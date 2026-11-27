import { mount, unmount } from 'svelte';
import { writable } from 'svelte/store';
import './ecosystem.css';
import Ecosystem from './Ecosystem.svelte';

export function createEcosystemScene(target, initial, onReady, onFailure) {
  const state = writable(initial);
  const component = mount(Ecosystem, { target, props: { input: state, onReady, onFailure } });
  return {
    update: value => state.set(value),
    dispose: () => unmount(component),
  };
}
