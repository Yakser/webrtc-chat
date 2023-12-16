'use client'

import {ReactNode, useState} from 'react';
import {ConfigProvider, theme} from 'antd';
import {io} from "socket.io-client";
import {SocketContext} from "@/contexts/SocketContext";
import {PeerContext} from "@/contexts/PeerContext";
import Peer from "peerjs";
import {UsersListContextProvider} from "@/contexts/UsersListContext";

const socket = io('/', {path: '/api/socketio'});

export function Providers({children}: { children: ReactNode }) {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [isPeerReady, setIsPeerReady] = useState<boolean>(false);
    const [myId, setMyId] = useState<string>('');

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <SocketContext.Provider value={socket}>
                <PeerContext.Provider value={{
                    peer,
                    isPeerReady,
                    myId,
                    setPeer,
                    setIsPeerReady,
                    setMyId
                }}>
                    <UsersListContextProvider>
                        {children}
                    </UsersListContextProvider>
                </PeerContext.Provider>
            </SocketContext.Provider>
        </ConfigProvider>
    );
}
