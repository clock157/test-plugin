import fs from 'fs';
import path, { join } from 'path';

const debug = require('debug')('docz');

export default function(api: any) {
    const { _resolveDeps, webpackConfig } = api;
    
    api.registerCommand('doc', {
        description: 'start a doc server',
        webpack: true,
    }, (args => {
        debug(11111111);
        const filePath = path.resolve(__dirname, 'hello.json');
        fs.writeFileSync(filePath, JSON.stringify(api.webpackConfig))
        debug(api.webpackConfig);
        const afWebpackOpts = api.applyPlugins('modifyAFWebpackOpts', {
          initialValue: {
            cwd: api.cwd,
          },
        });
        // debug(afWebpackOpts);
        const afWebpackOpts2 = api.applyPlugins('modifyAFWebpackOpts', {
          initialValue: {
            cwd: api.cwd,
          },
        });
        
        

        const afWebpackConfig = require(_resolveDeps('af-webpack/getConfig')).default(
          afWebpackOpts,
        );

        afWebpackOpts.chainConfig = webpackConfig => {
          api.applyPlugins('chainWebpackConfig', {
            args: webpackConfig,
          });
          if (config.chainWebpack) {
            config.chainWebpack(webpackConfig, {
              webpack: require('af-webpack/webpack'),
            });
          }
        };
        

        const opts =  api.applyPlugins('modifyWebpackConfig', {
          initialValue: afWebpackConfig,
        });

        // debug(opts);
        
        // fs.writeFileSync(filePath, afWebpackOpts);
        // debug(afWebpackConfig);
    }));
}
