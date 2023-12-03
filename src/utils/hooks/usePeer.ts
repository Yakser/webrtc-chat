'use client';

import {useContext, useEffect, useState} from 'react';

import {useParams, usePathname, useRouter} from 'next/navigation';
import Peer from 'peerjs';

import {Nullable, PeerId, RoomId} from '@/utils/types';
import {useMediaStream} from "@/utils/hooks/index";
import {SocketContext} from "@/contexts/SocketContext";
import {LocalStorageKeys} from "@/utils/constants";
import {loadWebpackHook} from "next/dist/server/config-utils";

const usePeer = (stream: MediaStream) => {
    const socket = useContext(SocketContext);
    const room = useParams()?.roomId;

    const {muted, visible} = useMediaStream(stream);

    const [isLoading, setIsLoading] = useState(true);
    const [peer, setPeer] = useState<Nullable<Peer>>(null);
    const [myId, setMyId] = useState<PeerId>('');

    useEffect(() => {
        (async function createPeerAndJoinRoom() {
            try {
                const peer = new (await import('peerjs')).default();
                setPeer(peer);
                setIsLoading(false);

                peer.on('open', (id) => {
                    console.log('your device id: ', id);
                    setMyId(id);

                    socket?.emit('room:join', {
                        room,
                        userID: id
                    });
                });

                peer.on('error', () => console.error('Failed to setup peer connection'));
            } catch (e) {
                console.error(e)
            }
        })();
    }, []);

    return {
        peer,
        myId,
        isPeerReady: !isLoading,
    };
};

export default usePeer;
