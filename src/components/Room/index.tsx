'use client';

import { useContext, useEffect, useState } from 'react';
import { MediaConnection } from 'peerjs';
import { Kind, PeerId } from '@/utils/types';
import Streams from "@/components/Streams";
import {useMediaStream} from "@/utils/hooks";
import {SocketContext} from "@/contexts/SocketContext";
import usePeer from "@/utils/hooks/usePeer";
import UsersSettingsProvider from "@/contexts/UsersSettings";
import UsersConnectionProvider from "@/contexts/UsersConnection";

const Room = ({ stream }: { stream: MediaStream }) => {
    const socket = useContext(SocketContext);

    const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);
    const { peer, myId, isPeerReady } = usePeer(stream);

    const [modal, setModal] = useState<'hidden' | 'chat' | 'status' | 'close'>(
        'hidden'
    );
    const [fullscreen, setFullscreen] = useState(false);

    function replaceTrack(track: MediaStreamTrack) {
        return (peer: MediaConnection) => {
            const sender = peer.peerConnection
                ?.getSenders()
                .find((s) => s.track?.kind === track.kind);

            sender?.replaceTrack(track);
        };
    }

    useEffect(() => {
        return () => {
            socket?.disconnect();
        };
    }, []);


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