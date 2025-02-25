import { ThemedText, ThemedView } from '@/components';
import { Link } from 'expo-router';
import { Component, Fragment } from 'react';

import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

storage.set('test', 'Space of uniqueness will essentially facilitate an ultimate explosion of the joy.')
console.log(storage.getString('test'))
console.log(storage.getBoolean('test'))
console.log(storage.getNumber('test'))
console.log(storage.getBuffer('test'))
console.log(storage.getAllKeys());

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <ThemedText>
                    index index index index index index index index index index index index index index index
                    index index index index index index index index index index index index index index index
                    index index index index index index index index index index index index index index index
                    index index index index index index index index index index index index index index index
                    index index index index index index index index index index index index index index index
                    index index index index index index index index index index index index index index index
                </ThemedText>

                <ThemedView>
                    <Link href={{ pathname: '/dashboard' }}>
                        <ThemedText type="link">Dashboard</ThemedText>
                    </Link>
                    <Link href={{ pathname: '/pair' }}>
                        <ThemedText type="link">pair</ThemedText>
                    </Link>
                </ThemedView>
            </Fragment>
        );
    }
}
