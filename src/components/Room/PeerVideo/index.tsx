import {memo} from 'react';
import style from './index.module.scss';
import {Typography} from 'antd';

export type PeerVideoProps = {
    stream: MediaStream;
    name: string;
    isMe: boolean;
}

const PeerVideo = ({
                       stream,
                       name,
                       isMe,
                   }: PeerVideoProps) => (
    <div className={`${style.video} ${isMe ? style.video__my : ''}`}>
        <video
            ref={(node) => {
                if (node) node.srcObject = stream;
            }}
            autoPlay
            muted={isMe}
            className={style.video__videoElement}
        />
        <Typography.Text className={style.video__name}>
            {name} {
                isMe && <Typography.Text className={style.video__name} type={'secondary'}>
                    (You)
                </Typography.Text>
            }
        </Typography.Text>
    </div>
);

export default memo(PeerVideo);
