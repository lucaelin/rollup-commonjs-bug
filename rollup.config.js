import html from '@web/rollup-plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'index.html',
  output: { dir: 'dist' },
  plugins: [html(), resolve(), commonjs()],
};
