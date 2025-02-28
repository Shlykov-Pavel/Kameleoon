import { Configuration } from 'webpack';
import { resolve } from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: resolve(__dirname, 'src', 'index.tsx'),
        build: resolve(__dirname, 'build'),
        html: resolve(__dirname, 'public', 'index.html'),
        src: resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';
    const PORT = env.port || 3000;

    const isDev = mode === 'development';

    const onlyDevAutoAuth = env.onlyDevAutoAuth || '';

    const config: Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        project: 'frontend',
        onlyDevAutoAuth,
    });


    config.output = {
        ...config.output,
        filename: isDev ? '[name].js' : '[name].[contenthash].js',
        chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js',
        path: paths.build,
        publicPath: 'auto',
        clean: true, 
    };

    config.cache = {
        type: 'filesystem', 
        buildDependencies: {
            config: [__filename],
        },
    };

    config.watchOptions = {
        ignored: /node_modules/, 
    };

    if (!isDev) {
        config.optimization = {
            ...config.optimization,
            moduleIds: 'deterministic',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                        maxInitialRequests: 5, 
                        minSize: 0, 
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            }
        };
    }
    return config;
};
