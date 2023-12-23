'use client';

import React, {useContext, useEffect} from 'react';
import {SocketContext} from "@/contexts/SocketContext";

const RootSocketConnector: React.FC = () => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        return () => {
            // socket?.emit('disconnect');
        }
    }, [socket]);
    return <></>;
};

export default RootSocketConnector;