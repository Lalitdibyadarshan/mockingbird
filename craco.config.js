const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig, {env, paths}) => {
            const isEnvProduction = env === 'production';
            updateEntryPoints(paths);
            return {
                ...webpackConfig,
                entry: {
                    main: [!isEnvProduction &&
                        require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
                    options: [!isEnvProduction &&
                        require.resolve('react-dev-utils/webpackHotDevClient'), paths.appOptionsJs].filter(Boolean),
                    content: './src/chrome/scripts/content.ts',
                    background: './src/chrome/scripts/background.ts',
                    inject: './src/chrome/scripts/inject.ts'
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
                resolve: {
                    ...webpackConfig.resolve,
                    alias: {
                        ...webpackConfig.resolve.alias,
                        "@shared": path.resolve(__dirname, "./src/shared/"),
                    }
                }
            }
        }
    }
}

function updateEntryPoints(paths) {
    paths.appIndexJs = path.resolve(__dirname, 'src/popup.tsx');
    paths.appOptionsJs = path.resolve(__dirname, 'src/options.tsx');
}
