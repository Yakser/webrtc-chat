import {useContext} from 'react';

import {UsersConnectionContext} from "@/contexts/UsersConnection";
import {getUsername} from "@/utils/helpers";
import VideoContainer from "@/components/Room/Streams/VideoContainer";
import PeerVideo from "@/components/Room/PeerVideo";

export default function MyStream({
                                     stream
                                 }: {
    stream: MediaStream;
}) {
    const {myId} = useContext(UsersConnectionContext);

    return (
        <VideoContainer
            id={myId}
            stream={stream}
        >
            <PeerVideo stream={stream} name={getUsername()} isMe={true}/>
        </VideoContainer>
    );
}
