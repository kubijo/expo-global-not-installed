module.exports = api => {
    api.cache(true);
    return {
        presets: [
            [
                require.resolve('babel-preset-expo'),
                {
                    reanimated: true,
                    'react-compiler': false,
                    jsxRuntime: 'automatic',
                    jsxImportSource: 'react',
                    useTransformReactJSXExpermiental: true,
                },
            ],
            /**
             * This is here as a plugin instead of preset so that we can
             * make sure that it runs before the "class-properties".
             *
             * @see https://github.com/facebook/create-react-app/pull/9235/files
             * @see https://babeljs.io/docs/en/babel-preset-typescript
             */
            [
                require.resolve('@babel/preset-typescript'),
                {
                    isTSX: true,
                    jsxPragma: 'React',
                    allExtensions: true,
                    allowNamespaces: false,
                    allowDeclareFields: true,
                    onlyRemoveTypeImports: true,
                },
            ],
        ],
        plugins: [
            [require.resolve('@babel/plugin-transform-react-jsx'), { runtime: 'automatic' }],
            require.resolve('@babel/plugin-proposal-export-namespace-from'), // Requested by "react-native-reanimated"
            require.resolve('react-native-reanimated/plugin'), // react-native-reanimated/plugin has to be listed last!
        ],
    };
};
