import React from 'react';
import { Status } from '@/utils/types';


export function useMediaStream(stream: MediaStream | null = null) {
    const [state, setState] = React.useState<MediaStream | null>(stream);
    const [status, setStatus] = React.useState<Status>('loading');

    const [m, setM] = React.useState(false);
    const [v, setV] = React.useState(true);

    React.useEffect(() => {
        if (stream) {
            setStatus('idle');

            const [audio, video] = stream.getTracks();
            setM(!audio.enabled);
            setV(video.enabled);
        } else {
            (async function createStream() {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    });

                    setState(stream);
                    setStatus('success');
                } catch (error) {
                    setStatus('rejected');
                    console.error('Access denied for audio and video stream', error);
                }
            })();
        }
    }, [stream]);
    
    return {
        stream: state,
        isLoading: status == 'loading',
        isError: status == 'rejected',
        isSuccess: status == 'success' || status == 'idle',
    };
}