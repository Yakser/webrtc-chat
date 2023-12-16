import React from "react";
import styles from './index.module.scss';

type VideoContainerProps = {
    id: string;
    children: React.ReactNode;
    stream: MediaStream;
    onMutePeer?: (id: string) => void;
    onRemovePeer?: (id: string) => void;
};


const VideoContainer: React.FC<VideoContainerProps> = ({
                                                           id,
                                                           children,
                                                       }) => {
    return (
        <div
            key={id}
            className={styles.videoContainer}
        >
            {children}
        </div>
    );
};

export default VideoContainer;

