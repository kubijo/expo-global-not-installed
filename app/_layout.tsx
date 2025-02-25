import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import Constants from 'expo-constants';
import { IntlProvider } from 'react-intl';

import { useColorScheme } from '@/hooks/useColorScheme';

function RootLayout() {
    const colorScheme = useColorScheme();
    const screenOptions: NativeStackNavigationOptions = {
        headerStyle: { backgroundColor: 'hotpink' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
    };

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={screenOptions}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

let AppEntryPoint = RootLayout;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig?.extra?.storybookEnabled === 'true') AppEntryPoint = require('../.storybook').default;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootElement() {
    // Unlock the screen orientation.
    // Screen does not rotate on samsung tab when unlock is not called
    useEffect(() => {
        ScreenOrientation.unlockAsync().catch(e => {
            console.warn('Screen orientation unlock failed', e);
        });
    }, []);

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) SplashScreen.hideAsync();
    }, [loaded]);

    if (!loaded) return null;

    return (
        <IntlProvider locale="en" messages={{}} defaultLocale="en">
            <AppEntryPoint />
        </IntlProvider>
    );
}
