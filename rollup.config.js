import babel from '@rollup/plugin-babel';

export default {
  input: 'index.js',
  output: [
    {
      format: 'cjs',
      file: 'build/index.js',
    },
  ],
  external: ['yargs'],
  plugins: [babel({ babelHelpers: 'bundled' })],
};
