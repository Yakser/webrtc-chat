'use client';

import {useContext, useEffect, useState} from 'react';

import {useParams, usePathname, useRouter} from 'next/navigation';
import Peer from 'peerjs';

import {Nullable, PeerId, RoomId} from '@/utils/types';
import {SocketContext} from "@/contexts/SocketContext";
import {LocalStorageKeys} from "@/utils/constants";
import {loadWebpackHook} from "next/dist/server/config-utils";
import {useMediaStream} from "@/utils/hooks/useMediaStream";
import {PeerContext} from "@/contexts/PeerContext";

export const usePeer = () => {
    const socket = useContext(SocketContext);
    const peerContext = useContext(PeerContext);
    const [isLoading, setIsLoading] = useState(true);
    const [peer, setPeer] = useState<Nullable<Peer>>(null);
    const [myId, setMyId] = useState<PeerId>('');

    useEffect(() => {
        (async function createPeer() {
            if (peerContext.peer) return;
            try {
                const peer = new (await import('peerjs')).default();
                peerContext.setIsPeerReady(true);
                peerContext.setPeer(peer);
                setPeer(peer);
                setIsLoading(false);

                peer.on('open', (id) => {
                    console.log('your device id: ', id);
                    setMyId(id);
                    peerContext.setMyId(id);
                });

                peer.on('error', () => console.error('Failed to setup peer connection'));
            } catch (error) {
                console.error(error);
            }
        })();
    }, [peerContext, socket]);

    return {
        peer: peerContext.peer || peer,
        myId: peerContext.myId || myId,
        isPeerReady: peerContext.isPeerReady || !isLoading,
    };
};
