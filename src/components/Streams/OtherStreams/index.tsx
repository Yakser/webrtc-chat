'use client';

import { useContext } from 'react';
import {UsersStateContext, UsersUpdaterContext} from "@/contexts/UsersSettings";
import {UsersConnectionContext} from "@/contexts/UsersConnection";
import {PeerId} from "@/utils/types";
import VideoContainer from "@/components/VideoContainer";



export default function OtherStreams() {
  const { streams } = useContext(UsersStateContext);

  return (
    <>
      {Object.entries(streams).map(([id, element]: [PeerId, any]) => (
        <VideoContainer
          key={id}
          id={id}
          stream={element.props.stream}
        >
          {element}
        </VideoContainer>
      ))}
    </>
  );
}
