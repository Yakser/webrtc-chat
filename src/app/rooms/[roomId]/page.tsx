'use client';

import React, {useState} from "react";
import {useMediaStream} from "@/utils/hooks";
import {Messages} from "@/utils/constants";
import Room from "@/components/Room";
import {Typography} from "antd";

type PageProps = {
    params: { roomId: string };
}
const Page: React.FC<PageProps> = ({params}: { params: { roomId: string } }) => {
    const {stream, isLoading} = useMediaStream();

    if (isLoading) return <>{Messages.LOADER_STREAM_MSG}</>;
    if (!stream) return <>Error! {Messages.FAILURE}</>;

    return (<>
        <Typography.Title level={2}>Room {params.roomId}</Typography.Title>
        <Room stream={stream}/>
    </>)
}

export default Page;