'use client'

import {createContext, ReactNode, useEffect} from 'react';
import {ConfigProvider, theme} from 'antd';
import {io} from "socket.io-client";
import {SocketContext} from "@/contexts/SocketContext";

const socket = io('/', {path: '/api/socketio'});

export function Providers({children}: { children: ReactNode }) {

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <SocketContext.Provider value={socket}>
                {children}
            </SocketContext.Provider>
        </ConfigProvider>
    );
}
