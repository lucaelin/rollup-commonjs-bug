import {rollupPluginHTML} from '@web/rollup-plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: './packages/index.html',
  output: { dir: 'dist' },
  plugins: [rollupPluginHTML(), json(), resolve(), commonjs()],
};
