'use client';

import React, {useContext, useEffect, useState} from "react";
import {useMediaStream} from "@/utils/hooks/useMediaStream";
import {Messages} from "@/utils/constants";
import Room from "@/components/Room";
import {Typography} from "antd";
import {SocketContext} from "@/contexts/SocketContext";
import {usePeer} from "@/utils/hooks/usePeer";
import {getUsername} from "@/utils/helpers";

type PageProps = {
    params: { roomId: string };
}
const Page: React.FC<PageProps> = ({params}: { params: { roomId: string } }) => {
    const socket = useContext(SocketContext);
    const {stream, isLoading} = useMediaStream();
    const {myId, peer, isPeerReady} = usePeer();

    useEffect(() => {
        const username = getUsername();
        console.log('room join', {
            roomId: params.roomId,
            userId: myId,
            userName: username,
        })
        socket?.emit('room:join', {
            roomId: params.roomId,
            userId: myId,
            userName: username,
        });
    }, [myId, params.roomId, socket]);

    if (isLoading) return <>{Messages.LOADER_STREAM_MSG}</>;
    if (!stream) return <>Error! {Messages.FAILURE}</>;

    return (
        <section>
            <Typography.Title level={2}>Room {params.roomId}</Typography.Title>
            <Room stream={stream} myId={myId} peer={peer} isPeerReady={isPeerReady}/>
        </section>
    )
}

export default Page;