const path = require('node:path');

const rootDirs = ['components', 'views'];

/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
    stories: rootDirs.map(x => path.join('..', x, '**/*.stories.?(ts|tsx|js|jsx)')),
    addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};
