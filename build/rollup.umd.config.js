import BaseConfig, { name, file } from './rollup.config'

export default {
  ...BaseConfig,
  output: {
    file: file('umd'),
    format: 'umd',
    name: 'legoComponents',
    exports: 'named',
    globals: {
      "vue": "Vue",
      "lodash-es": "_"
    }
  },
}