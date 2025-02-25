import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { IntlProvider } from 'react-intl';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
    // Unlock the screen orientation.
    // Screen does not rotate on samsung tab when unlock is not called
    useEffect(() => {
        try {
            ScreenOrientation.unlockAsync()
        } catch (e) {
            console.warn('Screen orientation unlock failed', e);
        }
    }, []);

    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

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

export default function () {
    return (
        <IntlProvider locale="en" messages={{}} defaultLocale="en">
            <RootLayout />
        </IntlProvider>
    );
}
