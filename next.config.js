const NextFederationPlugin = require('@module-federation/nextjs-mf');

const mfes = require('./src/constants/mfes.json');

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks';

  const remotesObject = {
    header: `header@${process.env.HEADER_MFE_URL}/_next/static/${location}/remoteEntry.js`,
    footer: `footer@${process.env.FOOTER_MFE_URL}/_next/static/${location}/remoteEntry.js`,
    content: `content@${process.env.CONTENT_MFE_URL}/_next/static/${location}/remoteEntry.js`
  };

  return remotesObject;
};

const exposes = {
  './utils/mfeRenderer': './src/utils/mfeRenderer',
};

module.exports = {
  output: 'standalone',

  experimental: {
    isrMemoryCacheSize: 0,
  },

  images: {
    minimumCacheTTL: 60,
  },

  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'mfes',
        filename: 'static/chunks/remoteEntry.js',
        exposes,
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          automaticAsyncBoundary: false,
        },
      })
    );
    return config;
  },
};
