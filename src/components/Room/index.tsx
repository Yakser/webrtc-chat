'use client';

import React, { useContext, useEffect } from 'react';
import Streams from "@/components/Streams";
import {SocketContext} from "@/contexts/SocketContext";
import {usePeer} from "@/utils/hooks/usePeer";
import UsersSettingsProvider from "@/contexts/UsersSettings";
import UsersConnectionProvider from "@/contexts/UsersConnection";
import Peer from "peerjs";

type RoomProps = {
    stream: MediaStream,
    isPeerReady: boolean,
    peer: Peer | null,
    myId: string,
}

const Room: React.FC<RoomProps> = ({ stream, peer, isPeerReady, myId }) => {
    const socket = useContext(SocketContext);
    
    useEffect(() => {
        return () => {
            socket?.disconnect();
        };
    }, [socket]);


    if (!isPeerReady) return <>Loading...</>;
    if (!peer) return <>Peer error!</>;

    return (
        <div className="flex">
            <UsersSettingsProvider>
                <div className="sm:flex hidden flex-col p-4 w-full h-screen">
                    <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
                        <div className="flex h-full place-items-center place-content-center gap-4">
                            <Streams
                                stream={stream}
                            />
                        </div>

                        <div className="flex items-center">
                            тут Control panel
                            {/*<ControlPanel*/}
                            {/*    visible={visible}*/}
                            {/*    muted={muted}*/}
                            {/*    chat={modal == 'chat'}*/}
                            {/*    onToggle={toggleKind}*/}
                            {/*    onLeave={() => router.push('/')}*/}
                            {/*/>*/}
                        </div>
                    </UsersConnectionProvider>
                </div>

            </UsersSettingsProvider>
        </div>
    );
}

export default Room;