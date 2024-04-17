import {createContext} from "react";
import Peer from "peerjs";

type PeerContextData = {
    peer: Peer | null,
    myId: string,
    isPeerReady: boolean,
    setPeer: (peer: Peer) => void,
    setMyId: (myId: string) => void,
    setIsPeerReady: (isPeerReady: boolean) => void,
}

export const PeerContext = createContext<PeerContextData>({
    peer: null,
    myId: '',
    isPeerReady: false,
    setPeer: () => {},
    setIsPeerReady: () => {},
    setMyId: () => {}
});
