'use client';

import React, { useContext } from 'react';
import {UsersStateContext} from "@/contexts/UsersSettings";
import {PeerId} from "@/utils/types";
import VideoContainer from "@/components/Room/Streams/VideoContainer";




export default function OtherStreams() {
  const { streams } = useContext(UsersStateContext);
  return (
    <>
      {Object.entries(streams).map(([id, element]: [PeerId, React.JSX.Element]) => (
        <VideoContainer
          key={id}
          id={id}
          stream={element ? element.props.stream: null}
        >
          {element}
        </VideoContainer>
      ))}
    </>
  );
}
