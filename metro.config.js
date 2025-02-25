const path = require('node:path');

const { mergeConfig } = require('metro-config');
const { getDefaultConfig } = require('@expo/metro-config');

const withStorybook = require('@storybook/react-native/metro/withStorybook');
const defaultConfig = getDefaultConfig(__dirname);

// const config = mergeConfig(defaultConfig, {
//     resolver: {
//         /**
//          * Some packages (eg.: Connect-ES, Protobuf-ES) use package exports.
//          * @see https://nodejs.org/docs/latest-v12.x/api/packages.html#packages_exports
//          *
//          * These need to be explicitly enabled for Metro.
//          * @see https://metrobundler.dev/docs/package-exports/
//          */
//         unstable_enablePackageExports: true,
//
//         assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
//         sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
//     },
//     transformer: {
//         babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
//     },
// });

module.exports = withStorybook(defaultConfig, {
    useJs: true,
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
});
