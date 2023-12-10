import { memo } from 'react';
import style from './index.module.scss';

const PeerVideo = ({
                       stream,
                       name,
                       isMe,
                   }: {
    stream: MediaStream;
    name: string;
    isMe?: boolean;
}) => (
    <div className={`${style.video} ${isMe ? style.video__my : ''}`}>
        <video
            ref={(node) => {
                if (node) node.srcObject = stream;
            }}
            autoPlay
            muted={isMe}
            className=""
        />

        <p className="font-medium absolute bottom-3 left-4 text-xs">
            <span className="">{name}</span>
        </p>
    </div>
);

export default memo(PeerVideo);
