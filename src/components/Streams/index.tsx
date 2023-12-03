'use client';

import MyStream from "@/components/Streams/MyStream";
import OtherStreams from "@/components/Streams/OtherStreams";

export default function Streams({
                                    stream,
                                }: StreamsProps) {

    return (
        <div
        >
            <MyStream stream={stream}/>
            другие стримы
            <OtherStreams/>
        </div>
    );
}

type StreamsProps = {
    stream: MediaStream;
};
