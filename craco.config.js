const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    // '@Components': path.resolve(__dirname, 'src/components'),
    // '@So_on': path.resolve(__dirname, 'src/so_on'),
    },

    configure: {
      output: {
        filename: "static/js/[name].js",
      },
      optimization: {
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false;
          },
        },
      },
    },
  },

  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = "static/css/[name].css";
          return webpackConfig;
        },
      },
      options: {},
    },
  ]
};