// const { getDefaultConfig } = require('@react-native/metro-config');

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig(__dirname);

//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true,
//         },
//       }),
//     },
//     resolver: {
//       assetExts: [...defaultConfig.resolver.assetExts], // just in case
//       sourceExts: [...defaultConfig.resolver.sourceExts],
//     },
//   };
// })();


// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { assetExts, sourceExts },
//   } = await getDefaultConfig();

//   return {
//     resolver: {
//       assetExts: [...assetExts, 'png', 'jpg', 'jpeg', 'svg'],
//       sourceExts: [...sourceExts, 'js', 'json', 'ts', 'tsx'],
//     },
//   };
// })();

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

