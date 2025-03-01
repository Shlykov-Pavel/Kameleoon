import { loader as MiniCssExtractPluginLoader } from 'mini-css-extract-plugin';

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.(c|sa|sc)ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPluginLoader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
            namedExport: false,
            exportLocalsConvention: 'as-is',
          },
        },
      },
      'sass-loader',
    ],
  };
}
