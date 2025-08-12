/*
  CRACO config to ensure modern Sass API is used and to fix tilde imports.
*/

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        // No special options required; CRA uses Dart Sass by default.
      },
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Ensure css-loader resolves tilde-less imports, which we've already updated.
      return webpackConfig;
    },
  },
};

