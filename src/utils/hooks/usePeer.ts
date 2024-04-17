'use client';

import {useContext, useEffect, useState} from 'react';

import Peer from 'peerjs';

import {Nullable, PeerId} from '@/utils/types';
import {SocketContext} from "@/contexts/SocketContext";
import {PeerContext} from "@/contexts/PeerContext";
import {useAppSelector} from "@/utils/hooks/useAppSelector";

export const usePeer = () => {
    const peerContext = useContext(PeerContext);
    const socket = useContext(SocketContext);
    const [isLoading, setIsLoading] = useState(true);
    const [peer, setPeer] = useState<Nullable<Peer>>(null);
    const [myId, setMyId] = useState<PeerId>('');
    const {user} = useAppSelector(state => state.auth);

    useEffect(() => {
        if (peer || peerContext.peer || !user.id) return;
        import("peerjs").then(({default: Peer}) => {
            try {
                const newPeer = new Peer({
                    // config: {
                    //     'iceServers': [
                    //         { url: 'stun:stun.l.google.com:19302' },
                    //     ]
                    // }
                });
                peerContext.setIsPeerReady(true);
                peerContext.setPeer(newPeer);
                setPeer(peer);
                setIsLoading(false);

                newPeer.on('open', (id) => {
                    console.log('your device id: ', id);
                    setMyId(id);
                    peerContext.setMyId(id);
                    socket?.emit('user:connect', {
                        id,
                        name: user.username
                    });
                });

                newPeer.on('error', () => console.error('Failed to setup peer connection'));
            } catch (error) {
                console.error(error);
            }
        })
    }, [peer, peerContext, socket, user.id, user.username]);

    return {
        peer: peerContext.peer || peer,
        myId: peerContext.myId || myId,
        isPeerReady: peerContext.isPeerReady || !isLoading,
    };
};
