'use client';

import React, {useContext, useEffect, useState} from "react";
import {useMediaStream} from "@/utils/hooks/useMediaStream";
import {Messages} from "@/utils/constants";
import Room from "@/components/Room";
import {Button, Form, Input, Typography} from "antd";
import {SocketContext} from "@/contexts/SocketContext";
import {usePeer} from "@/utils/hooks/usePeer";
import {useAppSelector} from "@/utils/hooks/useAppSelector";
import {UsersConnectionContext} from "@/contexts/UsersConnection";
import api from "@/utils/api";
import {RoomIsPrivateFlag} from "@/utils/api/types";

type PageProps = {
    params: { roomId: string };
}
type Fields = {
    password: string;
}
const Page: React.FC<PageProps> = ({params}: { params: { roomId: string } }) => {
    const [form] = Form.useForm<Fields>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string[]>([]);

    const socket = useContext(SocketContext);
    const {stream, isLoading: isStreamLoading} = useMediaStream();
    const {myId, peer, isPeerReady} = usePeer();
    const {user} = useAppSelector(state => state.auth);
    const {leaveRoom} = useContext(UsersConnectionContext);
    const [shouldFillPassword, setShouldFillPassword] = useState<boolean>(true);
    const [passwordIsCorrect, setPasswordIsCorrect] = useState<boolean>(false);
    const onFinish = ({password}: Fields) => {
        setIsLoading(true);
        api.post(`/rooms/verify/`, {password}, {params: {room_id: params.roomId}}).then(response => {
            if (response.status === 200) {
                return setPasswordIsCorrect(true)
            }

        }).catch(() => {
                form.setFields(
                    [
                        {
                            name: 'password',
                            value: password,
                            errors: ['Password is incorrect!'],
                        },
                    ]
                )
            }
        ).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        // todo: loading flag
        setIsLoading(true);
        api.get<RoomIsPrivateFlag>(`/rooms/is-private/`, {params: {room_id: params.roomId}}).then(response => {
            setShouldFillPassword(response.data.is_private);
        }).catch(() => setErrors(['Unknown server error!'])).finally(() => setIsLoading(false))

        socket?.emit('room:join', {
            roomId: params.roomId,
            userId: myId,
            userName: user.username,
        });
        return () => leaveRoom(myId);
    }, [leaveRoom, myId, params.roomId, socket, user.username]);

    if (isStreamLoading) return <>{Messages.LOADER_STREAM_MSG}</>;
    if (!stream) return <>Error! {Messages.FAILURE}</>;

    return (
        <section>
            <Typography.Title level={2}>Room {params.roomId}</Typography.Title>
            {
                shouldFillPassword && !passwordIsCorrect ? (
                    <Form
                        name="roomFillPassword"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 600}}
                        autoComplete="off"
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item<Fields>
                            label="Room password"
                            name="password"
                            rules={[{required: true, message: 'Please fill password!'}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.ErrorList errors={errors}/>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Join
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <Room stream={stream} myId={myId} peer={peer} isPeerReady={isPeerReady}/>
                )
            }
        </section>
    )
}

export default Page;