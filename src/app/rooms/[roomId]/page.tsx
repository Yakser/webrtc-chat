'use client';

import React, {useContext, useEffect, useState} from "react";
import {useMediaStream} from "@/utils/hooks/useMediaStream";
import {Messages} from "@/utils/constants";
import Room from "@/components/Room";
import {Typography} from "antd";
import {SocketContext} from "@/contexts/SocketContext";
import {usePeer} from "@/utils/hooks/usePeer";

type PageProps = {
    params: { roomId: string };
}
const Page: React.FC<PageProps> = ({params}: { params: { roomId: string } }) => {
    const socket = useContext(SocketContext);
    const {stream, isLoading} = useMediaStream();
    const {myId, peer, isPeerReady} = usePeer();

    useEffect(() => {
        socket?.emit('room:join', {
            roomId: params.roomId,
            userID: myId,
        });
    }, [myId, params.roomId, socket]);

    if (isLoading) return <>{Messages.LOADER_STREAM_MSG}</>;
    if (!stream) return <>Error! {Messages.FAILURE}</>;

    return (<>
        <Typography.Title level={2}>Room {params.roomId}</Typography.Title>
        <Room stream={stream} myId={myId} peer={peer}  isPeerReady={isPeerReady}/>
    </>)
}

export default Page;