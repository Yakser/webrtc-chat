'use client';

import React, {createContext, useState} from 'react';
import {Streams} from "@/utils/types";

export type UsersStateContextType = {
    streams: Streams,
}

export type UsersUpdaterContextType = {
    setStreams: React.Dispatch<React.SetStateAction<Streams>>,
}

export const UsersUpdaterContext = createContext<UsersUpdaterContextType>({
    setStreams: () => null,
});


export const UsersStateContext = createContext<UsersStateContextType>({
    streams: {},
});

export type Props = {
    children: React.ReactNode,
}
export const UsersSettingsProvider: React.FC<Props> = ({children}) => {
    const [streams, setStreams] = useState<Streams>({});

    return (
        <UsersStateContext.Provider
            value={{
                streams,
            }}
        >
            <UsersUpdaterContext.Provider
                value={{
                    setStreams,
                }}
            >
                {children}
            </UsersUpdaterContext.Provider>
        </UsersStateContext.Provider>
    );
}
