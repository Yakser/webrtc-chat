'use client';

import React, {useContext, useEffect} from 'react';
import Streams from "@/components/Streams";
import {SocketContext} from "@/contexts/SocketContext";
import {UsersSettingsProvider} from "@/contexts/UsersSettings";
import {UsersConnectionProvider} from "@/contexts/UsersConnection";
import Peer from "peerjs";

type RoomProps = {
    stream: MediaStream,
    isPeerReady: boolean,
    peer: Peer | null,
    myId: string,
}

const Room: React.FC<RoomProps> = ({stream, peer, isPeerReady, myId}) => {
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket?.connect();

        return () => {
            socket?.disconnect();
        };
    }, [socket]);


    if (!isPeerReady) return <>Loading...</>;
    if (!peer) return <>Peer error!</>;

    return (

        <UsersSettingsProvider>
            <UsersConnectionProvider stream={stream} myId={myId}>
                <Streams
                    stream={stream}
                />
            </UsersConnectionProvider>
        </UsersSettingsProvider>

    );
}

export default Room;