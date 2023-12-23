import {useContext} from 'react';

import {UsersConnectionContext} from "@/contexts/UsersConnection";
import VideoContainer from "@/components/Room/Streams/VideoContainer";
import PeerVideo from "@/components/Room/PeerVideo";
import {useAppSelector} from "@/utils/hooks/useAppSelector";

export default function MyStream({
                                     stream
                                 }: {
    stream: MediaStream;
}) {
    const {myId} = useContext(UsersConnectionContext);
    const {user} = useAppSelector(state => state.auth);

    return (
        <VideoContainer
            id={myId}
            stream={stream}
        >
            <PeerVideo stream={stream} name={user.username} isMe={true}/>
        </VideoContainer>
    );
}
