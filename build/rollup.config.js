import { name } from '../package.json'
const file = type => `dist/index.${type}.js`
console.log(file('esm'))
import json from 'rollup-plugin-json'
import vuePlugin from 'rollup-plugin-vue'
import lessPlugin from 'rollup-plugin-less'
import typescriptPlugin from 'rollup-plugin-typescript2'
import nodeResolvePlugin from '@rollup/plugin-node-resolve'
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ['src/main.ts','src/App.vue','node_modules']
}
export { name, file }
export default {
  input: 'src/index.ts',
  output: {
    name: name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolvePlugin.nodeResolve(),
    typescriptPlugin({ tsconfigOverride: overrides }),
    vuePlugin(),
    json(),
    lessPlugin({output: 'dist/css/app.css'}),
  ],
  external: ['vue', 'lodash-es']
}