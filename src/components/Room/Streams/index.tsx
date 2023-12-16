'use client';

import styles from './index.module.scss';
import MyStream from "@/components/Room/Streams/MyStream";
import OtherStreams from "@/components/Room/Streams/OtherStreams";

export default function Streams({
                                    stream,
                                }: StreamsProps) {

    return (
        <div
            className={styles.streams}
        >
            <MyStream stream={stream}/>
            <OtherStreams/>
        </div>
    );
}

type StreamsProps = {
        stream: MediaStream;
};
