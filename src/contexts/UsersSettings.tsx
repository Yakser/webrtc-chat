'use client';

import React, {createContext, useState} from 'react';


export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export default function UsersSettingsProvider({children}: any) {
    const [streams, setStreams] = useState<Record<string, React.ReactNode>>({});

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
