'use client';

import React, {useContext, useEffect} from 'react';
import {SocketContext} from "@/contexts/SocketContext";
import {UsersSettingsProvider} from "@/contexts/UsersSettings";
import {UsersConnectionProvider} from "@/contexts/UsersConnection";
import Peer from "peerjs";
import ControlPanel from "@/components/Room/ControlPanel";
import Streams from "@/components/Room/Streams";
import styles from './index.module.scss';


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
                <div className={styles.room}>
                    <Streams
                        stream={stream}
                    />
                    <ControlPanel/>
                </div>
            </UsersConnectionProvider>
        </UsersSettingsProvider>

    );
}

export default Room;