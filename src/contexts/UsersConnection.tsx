'use client';

import {createContext, useContext, useEffect, useState} from 'react';
// import {toast} from 'react-toastify';

import {PeerId} from '@/utils/types';
import {useRouter} from 'next/navigation';
import {UsersStateContext, UsersUpdaterContext} from "@/contexts/UsersSettings";
import PeerVideo from "@/components/PeerVideo";
import {SocketContext} from "@/contexts/SocketContext";
import {useMediaStream} from "@/utils/hooks";
import {append} from "@/utils/helpers";

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
        setIsMuted,
        setIsHidden,
        setAvatars,
        setStreams,
        setNames,
        setSharedScreenTrack,
    } = useContext(UsersUpdaterContext);

    const {muted, visible} = useMediaStream(stream);
    const [users, setUsers] = useState<any>({});

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
                console.table({
                    'call-friend': 'call friend',
                    'user-id': userId,
                    // 'user-name': name,
                    // visible: initMuted,
                    // muted: initVisible,
                });

                const call = peer.call(
                    userId,
                    stream, // my stream
                    {
                        metadata: {
                            user: {
                                // name: name
                                id: userId,
                            },
                            muted,
                            visible,
                        },
                    }
                );

                call.on('stream', (stream: MediaStream) => {
                    setStreams(
                        append({
                            [userId]: <PeerVideo stream={stream} isMe={false} name={userId}/>,
                        })
                    );
                    console.log('userId', userId)

                }); // * friend's stream
                // call.on('close', () => toast(`${name} has left the room`));

                setUsers(append({[userId]: call}));
            }
        );

        return () => {
            socket?.off('user:joined');
        };
    }, [peer]);

    // * user b answers to user a's call
    useEffect(() => {
        if (!peer) return;

        peer.on('call', (call: any) => {
            const {peer, metadata} = call;
            const {user, muted, visible} = metadata;

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
                const screenTrack = stream.getVideoTracks()[1];
                if (screenTrack) setSharedScreenTrack(screenTrack);
            }); // * receiver's stream
            // call.on('close', () => toast(`${user.name} has left the room`));
        });
    }, [peer]);

    useEffect(() => {
        socket?.on('user:left', (peerId: PeerId) => {
            if (myId === peerId) router.push('/');
            else {
                delete streams[peerId];
                setStreams(streams);
                users[peerId]?.close();
            }
        });

        return () => {
            socket?.off('user:left');
        };
    }, [myId, users]);

    useEffect(() => {
        socket?.on('user:shared-screen', (username: string) => {
            if (peer) {
                peer.disconnect();
                peer.reconnect();
                // toast(`${username} is sharing his screen`);
            }
        });

        return () => {
            socket?.off('user:shared-screen');
        };
    }, [peer]);

    useEffect(() => {
        socket?.on('user:stopped-screen-share', () => {
            setSharedScreenTrack(null);
            // toast('Stopped sharing screen');
        });

        return () => {
            socket?.off('user:stopped-screen-share');
        };
    }, []);

    return (
        <UsersConnectionContext.Provider value={{peer, myId, users, leaveRoom}}>
            {children}
        </UsersConnectionContext.Provider>
    );
}
