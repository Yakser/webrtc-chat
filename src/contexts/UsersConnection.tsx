'use client';

import {createContext, useContext, useEffect, useState} from 'react';

import {PeerId} from '@/utils/types';
import {useRouter} from 'next/navigation';
import {UsersStateContext, UsersUpdaterContext} from "@/contexts/UsersSettings";
import PeerVideo from "@/components/PeerVideo";
import {SocketContext} from "@/contexts/SocketContext";
import {append, getUsername} from "@/utils/helpers";

export const UsersConnectionContext = createContext<any>({});

export default function UsersConnectionProvider({
                                                    stream,
                                                    peer,
                                                    myId,
                                                    children,
                                                }: any) {
    const router = useRouter();

    const socket = useContext(SocketContext);
    const {streams} = useContext(UsersStateContext);
    const {
        setStreams,
        setNames,
    } = useContext(UsersUpdaterContext);

    const [users, setUsers] = useState<any>({});
    const [connections, setConnections] = useState<any>({});

    function leaveRoom(id: PeerId) {
        socket?.emit('user:leave', id);
        users[id].close();
        setStreams((s: any) => {
            const obj: any = {};
            for (const key in s) {
                if (key != id) obj[id] = s[id];
            }
            return obj;
        });
    }

    // * user a accepts user b and make a call
    useEffect(() => {
        if (!peer) return;

        socket?.on(
            'user:joined',
            (userId: string) => {
                const call = peer.call(
                    userId,
                    stream,
                    {
                        metadata: {
                            user: {
                                name: getUsername(),
                                id: userId,
                            },
                        },
                    }
                );

                call.on('stream', (stream: MediaStream) => {
                    setStreams(
                        append({
                            [userId]: <PeerVideo stream={stream} isMe={false} name={getUsername()}/>,
                        })
                    );

                });
                setUsers(append({[userId]: call}));
            }
        );

        return () => {
            socket?.off('user:joined');
        };
    }, [peer, setStreams, socket, stream]);

    // * user b answers to user a's call
    useEffect(() => {
        if (!peer) return;

        peer.on('call', (call: any) => {
            const {peer, metadata} = call;
            const {user} = metadata;

            console.log(user);

            setUsers(append({[peer]: call}));


            call.answer(stream); // * answers incoming call with his/her stream

            console.table({
                'answer-friend': 'answer friend',
                'user-id': peer,
                'user-name': user.name,
            });

            call.on('stream', (stream: MediaStream) => {
                setStreams(
                    append({
                        [peer]: <PeerVideo stream={stream} isMe={false} name={user.name}/>,
                    })
                );

            }); // * receiver's stream
            // call.on('close', () => toast(`${user.name} has left the room`));
        });
    }, [peer, setStreams, stream]);

    useEffect(() => {
        socket?.on('user:left', (peerId: PeerId) => {
            if (myId === peerId) router.push('/');
            else {
                console.log('user left', peerId)
                delete streams[peerId];
                setStreams(streams);
                users[peerId]?.close();
            }
        });

        return () => {
            socket?.off('user:left');
        };
    }, [myId, router, setStreams, socket, streams, users]);


    return (
        <UsersConnectionContext.Provider value={{peer, myId, users, leaveRoom}}>
            {children}
        </UsersConnectionContext.Provider>
    );
}
