'use client';

import MyStream from "@/components/Streams/MyStream";
import OtherStreams from "@/components/Streams/OtherStreams";
import styles from './index.module.scss';

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
