import { useContext } from 'react';

import {UsersConnectionContext} from "@/contexts/UsersConnection";
import {UsersStateContext} from "@/contexts/UsersSettings";
import HostControlPanel from "@/components/HostControlPanel";

const VideoContainer = ({
                            id,
                            children,
                            stream,
                            onMutePeer,
                            onRemovePeer,
                        }: SingleVideoProps) => {
    const { myId } = useContext(UsersConnectionContext);
    const { isHost } = useContext(UsersStateContext);

    return (
        <div
            key={id}
            className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
        >
            {children}

            {isHost && myId !== id && (
                <HostControlPanel
                    onMutePeer={() => onMutePeer && onMutePeer(id)}
                    onRemovePeer={() => onRemovePeer && onRemovePeer(id)}
                />
            )}
        </div>
    );
};

export default VideoContainer;

type SingleVideoProps = {
    id: string;
    children: React.ReactNode;
    stream: MediaStream;
    onMutePeer?: (id: string) => void;
    onRemovePeer?: (id: string) => void;
};
