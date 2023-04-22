import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from '@web/dev-server-rollup';

const commonjs = fromRollup(rollupCommonjs);

export default {
  rootDir: './packages',
  plugins: [
    commonjs({
      esmExternals: true,
      include: '**/node_modules/**/*',
      extensions: ['.js']
    }), 
  ],
};