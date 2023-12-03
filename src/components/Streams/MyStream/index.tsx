import {useContext} from 'react';

import {MYSELF} from '@/utils/constants';

import PeerVideo from "@/components/PeerVideo";
import {UsersConnectionContext} from "@/contexts/UsersConnection";
import VideoContainer from "@/components/VideoContainer";

export default function MyStream({
                                     stream,

                                 }: {
    stream: MediaStream;
}) {
    const {myId} = useContext(UsersConnectionContext);

    return (
        <VideoContainer
            id={myId}
            stream={stream}
        >
            <PeerVideo stream={stream} name={MYSELF} isMe={true}/>
        </VideoContainer>
    );
}