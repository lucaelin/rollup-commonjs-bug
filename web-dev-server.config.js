import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from '@web/dev-server-rollup';
import rollupJson from '@rollup/plugin-json';
import rollupResolve from '@rollup/plugin-node-resolve';

const commonjs = fromRollup(rollupCommonjs);
const json = fromRollup(rollupJson);
const resolve = fromRollup(rollupResolve);

export default {
  plugins: [
    json(),
    resolve(),
    commonjs(), 
  ],
};