import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { WebpackPluginInstance } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { resolve } from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './types/config';

const deps = require('../../package.json').dependencies;

export function buildPlugins({
  paths,
  isDev,
  project,
  onlyDevAutoAuth,
}: BuildOptions): WebpackPluginInstance[] {
  const isProd = !isDev;

  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new Dotenv(),
    new webpack.ProgressPlugin(),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __PROJECT__: JSON.stringify(project),
      ONLY_FOR_DEV_AUTO_AUTH: JSON.stringify(onlyDevAutoAuth),
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'WorkTime',
      filename: 'remoteEntry.js',
      exposes: {
      },
      //   shared: {
      //     react: { singleton: false, eager: true, requiredVersion: "^18.2.0" },
      //     "react-dom": {
      //       singleton: false,
      //       eager: true,
      //       requiredVersion: "^18.2.0",
      //     },
      //   },
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(
      new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 8886 })
    );
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: './config/config.json', to: './config' }],
      })
    );
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    );
  }

  return plugins;
}
