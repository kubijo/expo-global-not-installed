import { ImageBackground } from 'expo-image';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const $ = StyleSheet.create({
    fill: {
        position: 'absolute',

        width: '100%',
        height: '100%',

        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

/**
 * @param {{
 *  Story: React.ComponentType<any>;
 *  parameters: Record<string, any>;
 * }} props
 */
function StoryWrapper({ Story, parameters }) {
    const [n, setN] = useState(1);
    const poke = useCallback(() => setN(s => n * -1), [n]);

    return (
        <SafeAreaView style={$.fill}>
            <ImageBackground
                className="checkerboard"
                source={require('../assets/images/checkerboard.png')}
                imageStyle={{ resizeMode: 'repeat' }}
                // The "ImageBackground" component adds a size style
                // that prevents stretching on web, so we'll override.
                style={$.fill}
            >
                <ScrollView style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0 0 0 / 0.6)' }}>
                    <Story key={n} {...parameters} style={$.fill} />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

/** @type{import("@storybook/react").Preview} */
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [(Story, { parameters }) => <StoryWrapper Story={Story} parameters={parameters} />],
};

export default preview;
