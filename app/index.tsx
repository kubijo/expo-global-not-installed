import { ThemedText, ThemedView } from '@/components';
import { Link } from 'expo-router';
import { Component, Fragment } from 'react';

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
                </ThemedView>
            </Fragment>
        );
    }
}
