import React from "react";

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
            className=""
        >
            {children}
        </div>
    );
};

export default VideoContainer;

