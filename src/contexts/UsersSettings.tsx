'use client';

import React, {createContext, useContext, useState} from 'react';


import {KeyValue, PeerId, RoomId} from '@/utils/types';
import {isHost} from '@/utils/helpers';
import {SocketContext} from "@/contexts/SocketContext";
import {useParams} from "next/navigation";

export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export default function UsersSettingsProvider({children}: any) {
    const roomId = useParams()?.roomId;
    const socket = useContext(SocketContext);

    const [streams, setStreams] = useState<Record<PeerId, React.ReactNode>>({});

    const [avatars, setAvatars] = useState<KeyValue<string>>({});
    const [names, setNames] = useState<KeyValue<string>>({});

    return (
        <UsersStateContext.Provider
            value={{
                streams,
                isHost: isHost(roomId as RoomId),
                avatars,
                names,
            }}
        >
            <UsersUpdaterContext.Provider
                value={{
                    setStreams,
                    setNames,
                }}
            >
                {children}
            </UsersUpdaterContext.Provider>
        </UsersStateContext.Provider>
    );
}
