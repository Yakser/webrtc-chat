'use client';

import {createContext, useContext, useState} from 'react';


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

    const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
    const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
    const [avatars, setAvatars] = useState<KeyValue<string>>({});
    const [names, setNames] = useState<KeyValue<string>>({});

    const [sharedScreenTrack, setSharedScreenTrack] =
        useState<MediaStreamTrack | null>(null);


    return (
        <UsersStateContext.Provider
            value={{
                streams,
                isMuted,
                isHidden,
                isHost: isHost(roomId as RoomId),
                avatars,
                names,
                sharedScreenTrack,
            }}
        >
            <UsersUpdaterContext.Provider
                value={{
                    setIsMuted,
                    setIsHidden,
                    setAvatars,
                    setStreams,
                    setNames,
                    setSharedScreenTrack,
                    muteUser: (id: PeerId) => socket && socket.emit('host:mute-user', id),
                }}
            >
                {children}
            </UsersUpdaterContext.Provider>
        </UsersStateContext.Provider>
    );
}
