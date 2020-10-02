import babel from '@rollup/plugin-babel';
import shebang from 'rollup-plugin-preserve-shebang';

export default {
  input: 'build/index.js',
  output: [
    {
      format: 'cjs',
      file: 'build/index.js',
    },
  ],
  external: ['yargs', 'fs'],
  plugins: [babel({ babelHelpers: 'bundled' }), shebang()],
};
