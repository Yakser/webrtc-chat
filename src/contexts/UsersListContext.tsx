import React, {createContext, useContext, useEffect, useState} from "react";
import {SocketContext} from "@/contexts/SocketContext";

export const UsersListContext = createContext<Record<string, string>>({});

type UsersListContextProviderProps = {
    children: React.ReactNode;
}

export const UsersListContextProvider: React.FC<UsersListContextProviderProps> = ({children}) => {
    const socket = useContext(SocketContext);
    const [users, setUsers] = useState<Record<string, string>>({});

    useEffect(() => {
        socket?.on('user:connected', (users: Record<string, string>) => {
            setUsers(users);
        });
    }, [socket, users]);

    return (
        <UsersListContext.Provider value={users}>
            {children}
        </UsersListContext.Provider>
    )
}

