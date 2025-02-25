import { ThemedText } from '@/components';
import { fetch } from 'expo/fetch';
import { Component } from 'react';

export default class App extends Component {
    componentWillUnmount() {
        this.#abortConnect.abort();
    }
    componentDidMount() {
        this.#connect();
    }

    #abortConnect = new AbortController();
    #connect = async (): Promise<void | string> => {
        this.#abortConnect.abort();
        this.#abortConnect = new AbortController();

        const res = await fetch('https://example.org/', { signal: this.#abortConnect.signal });
        const text = await res.text();
        console.log('text', text);
    };

    render() {
        return (
            <ThemedText>
                pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair
                pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair pair
                pair pair pair pair pair pair pair pair pair pair pair pair pair
            </ThemedText>
        );
    }
}
