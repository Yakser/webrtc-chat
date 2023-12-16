import React, {createContext, useContext, useEffect, useState} from "react";
import {SocketContext} from "@/contexts/SocketContext";
import {User} from "@/utils/types";

export const UsersListContext = createContext<User[]>([]);

type UsersListContextProviderProps = {
    children: React.ReactNode;
}

export const UsersListContextProvider: React.FC<UsersListContextProviderProps> = ({children}) => {
    // fixme: use User type in socketio events
    const socket = useContext(SocketContext);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        socket?.on('user:connected', (user: User) => {
            setUsers([...users, user]);
        });
    }, [socket, users]);

    return (
        <UsersListContext.Provider value={users}>
            {children}
        </UsersListContext.Provider>
    )
}

