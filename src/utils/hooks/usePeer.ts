'use client';

import {useContext, useEffect, useState} from 'react';

import Peer from 'peerjs';

import {Nullable, PeerId} from '@/utils/types';
import {SocketContext} from "@/contexts/SocketContext";
import {PeerContext} from "@/contexts/PeerContext";
import {getUsername} from "@/utils/helpers";

export const usePeer = () => {
    const peerContext = useContext(PeerContext);
    const [isLoading, setIsLoading] = useState(true);
    const [peer, setPeer] = useState<Nullable<Peer>>(null);
    const [myId, setMyId] = useState<PeerId>('');

    useEffect(() => {
        if (peer || peerContext.peer) return;
        import("peerjs").then(({default: Peer}) => {
            try {
                const peer = new Peer();
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
        })
    }, []);

    return {
        peer: peerContext.peer || peer,
        myId: peerContext.myId || myId,
        isPeerReady: peerContext.isPeerReady || !isLoading,
    };
};
