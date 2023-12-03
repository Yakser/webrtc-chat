'use client';

import { useContext } from 'react';
import {UsersStateContext, UsersUpdaterContext} from "@/contexts/UsersSettings";
import {UsersConnectionContext} from "@/contexts/UsersConnection";
import {PeerId} from "@/utils/types";
import VideoContainer from "@/components/VideoContainer";



export default function OtherStreams() {
  const { streams, isMuted, isHidden, avatars } = useContext(UsersStateContext);
  const { muteUser } = useContext(UsersUpdaterContext);
  const { leaveRoom } = useContext(UsersConnectionContext);
  console.log(streams);
  return (
    <>
      {Object.entries(streams).map(([id, element]: [PeerId, any]) => (
        <VideoContainer
          key={id}
          id={id}
          muted={isMuted[id]}
          visible={!isHidden[id]}
          stream={element.props.stream}
          onMutePeer={muteUser}
          onRemovePeer={leaveRoom}
        >
          {element}
        </VideoContainer>
      ))}
    </>
  );
}
