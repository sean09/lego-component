import BaseConfig, { name, file } from './rollup.config'

export default {
  ...BaseConfig,
  output: {
    file: file('esm'),
    format: 'esm',
    name,
  },
}