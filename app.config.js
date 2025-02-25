const process = require('node:process');

const IS_DEV = process.env.APP_VARIANT === 'development';
function prodDev(prod, dev) {
    return IS_DEV ? dev : prod;
}

const backgroundColor = '#161616';
const name = 'expo-repro';
const slug = prodDev('expo-repro', 'expo-reproDev');
const bundleIdentifier = prodDev('com.kubijo.exporepro', 'com.kubijo.exporeproDev');

const versionSemver = '0.0.1';
const versionInteger = 101;

module.exports = {
    expo: {
        version: versionSemver,

        name,
        slug,
        scheme: slug,

        backgroundColor,
        icon: './assets/images/icon.png',
        orientation: 'default',
        newArchEnabled: true,
        userInterfaceStyle: 'automatic',

        ios: {
            supportsTablet: true,
            bundleIdentifier,
        },
        android: {
            package: bundleIdentifier,
            permissions: ['android.permission.CAMERA'],
            adaptiveIcon: {
                backgroundColor,
                foregroundImage: './assets/images/adaptive-icon.png',
            },
            jsEngine: 'hermes',
        },
        androidStatusBar: {
            translucent: true,
            barStyle: 'light-content',
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },

        plugins: [
            [
                'expo-dev-client',
                {
                    addGeneratedScheme: !!IS_DEV,
                },
            ],
            'expo-font',
            'expo-router',
            'expo-localization',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor,
                },
            ],
            [
                'expo-screen-orientation',
                {
                    initialOrientation: 'ALL',
                },
            ],
            [
                'expo-camera',
                {
                    cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera',
                    microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone',
                    recordAudioAndroid: false,
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
            turboModules: true,
        },

        extra: {
            storybookEnabled: process.env.STORYBOOK_ENABLED,
            applicationVersionNumber: versionInteger,
        },
    },
};
