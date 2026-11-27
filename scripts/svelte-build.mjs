import { readFile } from 'node:fs/promises';
import { compile, compileModule } from 'svelte/compiler';

export const svelteClient = {
  name: 'svelte-client',
  setup(build) {
    const styles = new Map();
    build.onResolve({ filter: /^svelte-style:/ }, ({ path }) => ({
      path: path.slice('svelte-style:'.length),
      namespace: 'svelte-style',
    }));
    build.onLoad({ filter: /.*/, namespace: 'svelte-style' }, ({ path }) => ({
      contents: styles.get(path),
      loader: 'css',
    }));
    build.onLoad({ filter: /\.svelte(?:\.js)?$/ }, async ({ path }) => {
      const source = await readFile(path, 'utf8');
      const options = { filename: path, generate: 'client' };
      const result = path.endsWith('.svelte.js') ? compileModule(source, options) : compile(source, options);
      const styleImport = result.css ? '\nimport ' + JSON.stringify('svelte-style:' + path) + ';' : '';
      if (result.css) styles.set(path, result.css.code);
      return { contents: result.js.code + styleImport, loader: 'js' };
    });
  },
};
