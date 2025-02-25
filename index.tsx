import '@expo/metro-runtime';

import 'intl';
import 'intl-pluralrules';
import 'intl/locale-data/jsonp/en-US';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

renderRootComponent(App);
