import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { create } from '@bufbuild/protobuf';
import { ConnectError, createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { type FetchRequestInit, fetch } from 'expo/fetch';
import { ElizaService, IntroduceRequestSchema } from '../gen/connectrpc/eliza/v1/eliza_pb.js';

interface ConvoResponse {
    text: string;
    sender: 'eliza' | 'user';
}

const $ = StyleSheet.create({
    app: {
        borderWidth: 3,
        borderColor: 'hotpink',
        borderStyle: 'solid',
        width: 400,
        height: 400,
        backgroundColor: '#fafafa',
    },
    elizaRespContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        borderWidth: 2,
        borderColor: '#ebebeb',
        borderRadius: 28,
        marginVertical: 5,
    },
    respText: {
        fontSize: 18,
        margin: 5,
        backgroundColor: '#fff',
        paddingVertical: 16,
        paddingHorizontal: 20,
        color: '#09083a',
        borderRadius: 28,
        overflow: 'hidden',
    },
    elizaRespText: {
        color: '#090a3a',
    },
    userRespContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right',
        borderRadius: 28,
        borderWidth: 0,
    },
    userRespText: {
        color: '#165fed',
        backgroundColor: '#e0edff',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ebebeb',
        padding: 10,
        marginVertical: 5,
    },
});
export function GrpcDemo() {
    const [statement, setStatement] = useState<string>('');
    const [introFinished, setIntroFinished] = useState<boolean>(false);
    const [responses, setResponses] = useState<ConvoResponse[]>([
        {
            text: 'What is your name?',
            sender: 'eliza',
        },
    ]);

    // Make the Eliza Service client using grpc-web transport.
    const client = createClient(
        ElizaService,
        createConnectTransport({
            baseUrl: 'https://demo.connectrpc.com',
            // Customize fetch with the Expo fetch implementation
            fetch: (input, init) => {
                if (typeof input !== 'string') {
                    throw new Error('expo/fetch requires the first argument to be a string URL');
                }
                return fetch(input, init as unknown as FetchRequestInit) as unknown as Promise<Response>;
            },
        }),
    );

    const send = async () => {
        setResponses(resp => [...resp, { text: statement, sender: 'user' }]);
        setStatement('');

        if (introFinished) {
            const response = await client.say({
                sentence: statement,
            });

            setResponses(resps => [...resps, { text: response.sentence, sender: 'eliza' }]);
        } else {
            try {
                const request = create(IntroduceRequestSchema, {
                    name: statement,
                });

                // Note that cancelling streams does not currently work with
                // React Native Expo v52.
                // See https://github.com/expo/expo/issues/33549 for more context.
                const stream = client.introduce(request);
                for await (const response of stream) {
                    setResponses(resps => [...resps, { text: response.sentence, sender: 'eliza' }]);
                }
            } catch (err) {
                let text = '';
                if (err instanceof ConnectError) {
                    text = `A Connect error has occurred: ${err.message}`;
                } else {
                    text = `An error has occurred: ${err}`;
                }
                setResponses(resps => [
                    ...resps,
                    {
                        text,
                        sender: 'eliza',
                    },
                ]);
            }
            setIntroFinished(true);
        }
    };

    return (
        <ScrollView style={$.app}>
            <ThemedView>
                <ThemedText type="title" children="Eliza: React Native" />

                {responses.map((resp, i) => {
                    return (
                        <ThemedView
                            key={`resp${i}`}
                            style={resp.sender === 'eliza' ? $.elizaRespContainer : $.userRespContainer}
                        >
                            <ThemedText
                                style={[$.respText, resp.sender === 'eliza' ? $.elizaRespText : $.userRespText]}
                                children={resp.text}
                            />
                        </ThemedView>
                    );
                })}
                <TextInput style={$.textInput} value={statement} onChangeText={setStatement} />

                <Button title="Send" onPress={send} />
            </ThemedView>
        </ScrollView>
    );
}
