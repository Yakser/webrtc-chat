'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';

import {PeerId, Peers, Streams} from '@/utils/types';
import {useRouter} from 'next/navigation';
import {UsersStateContext, UsersUpdaterContext} from "@/contexts/UsersSettings";
import PeerVideo from "../components/Room/PeerVideo";
import {SocketContext} from "@/contexts/SocketContext";
import {append, getUsername, removeUserStream} from "@/utils/helpers";
import {MediaConnection} from "peerjs";
import {usePeer} from "@/utils/hooks/usePeer";

export type UsersConnectionContextType = {
    myId: string,
    users: Peers,
    leaveRoom: (id: PeerId) => void,
}


export const UsersConnectionContext = createContext<UsersConnectionContextType>({
    myId: '',
    users: {},
    leaveRoom: () => null
});

type Props = {
    stream: MediaStream
    myId: string,
    children: React.ReactNode,
}
export const UsersConnectionProvider: React.FC<Props> = ({
                                                             stream,
                                                             myId,
                                                             children,
                                                         }) => {
    const router = useRouter();
    const {peer} = usePeer();
    const socket = useContext(SocketContext);
    const {streams} = useContext(UsersStateContext);
    const {
        setStreams,
    } = useContext(UsersUpdaterContext);

    // fixme: rename to Peers(Calls) by userId
    const [users, setUsers] = useState<Peers>({});

    function leaveRoom(id: PeerId) {
        socket?.emit('user:leave', id);
        users[id].close();
        setStreams(removeUserStream(id));
    }

    // * user a accepts user b and make a call
    useEffect(() => {
        if (!peer) return;

        socket?.on(
            'user:joined',
            ({userId, userName}: { userId: string, userName: string }) => {
                console.table({
                    'user-joined': 'user:joined',
                    'peer': peer.id,
                    'user-id': userId,
                    'user-name': userName,
                });
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
                        append<Streams>({
                            [userId]: <PeerVideo stream={stream} isMe={false} name={userName}/>,
                        })
                    );

                });
                setUsers(append<Peers>({[userId]: call}));
            }
        );

        return () => {
            socket?.off('user:joined');
        };
    }, [peer, setStreams, socket, stream]);

    // * user b answers to user a's call
    useEffect(() => {
        if (!peer) return;

        peer.on('call', (call: MediaConnection) => {
            const {peer, metadata} = call;
            const {user} = metadata;

            setUsers(append<Peers>({[peer]: call}));

            call.answer(stream); // * answers incoming call with his/her stream

            console.table({
                'peer.on call': 'peer.on call',
                'peer': peer,
                'user-id': user.id,
                'user-name': user.name,
            });

            call.on('stream', (stream: MediaStream) => {
                setStreams(
                    append<Streams>({
                        [peer]: <PeerVideo stream={stream} isMe={false} name={user.name}/>,
                    })
                );

            }); // * receiver's stream
        });
    }, [peer, setStreams, stream]);

    useEffect(() => {
        socket?.on('user:left', (peerId: PeerId) => {
            if (peerId === "") return;
            if (myId === peerId) router.push('/');
            else {
                setStreams(removeUserStream(peerId));
                users[peerId]?.close();
            }
        });

        return () => {
            socket?.off('user:left');
        };
    }, [myId, router, setStreams, socket, streams, users]);


    return (
        <UsersConnectionContext.Provider value={{myId, users, leaveRoom}}>
            {children}
        </UsersConnectionContext.Provider>
    );
}
