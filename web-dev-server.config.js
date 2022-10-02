import rollupCommonjs from "@rollup/plugin-commonjs";
import {fromRollupWithFix, fixExportNamedExports} from './wdsCommonjsFixes.js';

const commonjs = fromRollupWithFix(rollupCommonjs);

export default {
  plugins: [
    commonjs(), 
    //fixExportNamedExports(),
  ],
};

/*import { fromRollup } from '@web/dev-server-rollup';

// This is a fix for inifinitely looping from resolve back to resolveId when the skipSelf flag is set
// sadly the original resolve function is restored for every resolveId/resolveImport call by the adapter, so it needs to be pached every time
function fixResolveSkipSelf(pluginContext, resolveIdArgs) {
  const originalResolve = pluginContext.resolve;
  pluginContext.resolve = function(...args) {
    //console.log('resolve args', this, args, pluginContext, resolveIdArgs);

    // this prevents all other plugins from running, which might not be an issue because in the rollup context there may not be any other ones
    if (args[2].skipSelf) {
      //console.log('skipping self');
      return undefined;
    } 
    return originalResolve.call(this, ...args);
  };
}

function fixOptionsHookPluginInjection(moduleFn) {
  return function(...args) {
    // instantiate the module
    const module = moduleFn(...args);
    //console.log('module', module);

    // we wrap the modules options call into our own function to process its return value and find the injected plugin
    const optionsHook = module.options;
    module.options = function(...args) {
      const optionsReturn = optionsHook.call(this, ...args);
      
      // we find the injected plugin
      const injectedPlugins = optionsReturn.plugins;
      if (injectedPlugins.length > 1) throw new Error('Multiple injected plugins detected. This wont work!')
      const [injectedResolvePlugin] = injectedPlugins;
      //console.log('injected plugins', injectedPlugins);

      // now we move the injected plugins resolveId hook back into the original module
      if (module.resolveId) throw new Error('Existing resolveId detected. This wont work!');
      module.resolveId = function (...args) {
        // fix infinite loop
        fixResolveSkipSelf(this, args);

        const resolveReturn = injectedResolvePlugin.resolveId.call(this, ...args);
        return resolveReturn;
      };

      // we return what was originally returned by the options call to allow a fixed version of wds to process it
      return optionsReturn;
    }

    return module;
  }
}

function fromRollupWithFix(rollupPlugin) {
  return fromRollup(fixOptionsHookPluginInjection(rollupPlugin));
}

const commonjs = fromRollupWithFix(rollupCommonjs);

export default {
  plugins: [
    commonjs(), 
    {
      name: 'fix-commonjs-module',
      transform(context) {
        // this fixes the missing export named exports
        if (context.url.endsWith(encodeURIComponent('?commonjs-module'))) {
          return `var exports = {}; var __module = {exports}; export {__module, exports}`;
        }
      },
    }
  ],
};


/*

serverStart(...args) {
  console.log('serverStart', this, args);
  args[0].config.plugins.forEach(plugin=>{
    if (plugin.resolveImport) {
      const originalResolveImport = plugin.resolveImport;
      plugin.resolveImport = function(...args) {
        console.log('spy', args);
        const resolveImportReturn = originalResolveImport.call(this, ...args);
        console.log('spy out', resolveImportReturn);
        return resolveImportReturn;
      }
    }
    console.log(plugin);
  });
}
*/
/*createRollupPluginContextAdapter async resolve + options argument
if (!context.skipPlugins) context.skipPlugins = new Set();
if (options?.skipSelf) context.skipPlugins.add(wdsPlugin.name);
  then inside loop
    if (context.skipPlugins.has(pl.name)) continue;
    ...
    const result = await pl.resolveImport({ source, context }, options);
*/