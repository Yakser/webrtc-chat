'use client';

import React, {useCallback} from "react";
import {Button, Form, Input, Typography} from "antd";
import {useRouter} from 'next/navigation';
import {usePeer} from "@/utils/hooks/usePeer";
import api from "@/utils/api";
import {RoomIsPrivateFlag} from "@/utils/api/types";

type FieldType = {
    roomId: string;
};


const JoinRoomForm = () => {
    const router = useRouter();
    const [form] = Form.useForm<FieldType>();
    const {myId} = usePeer();

    const onFinish = useCallback(
        (values: FieldType) => {
            router.push(`rooms/${values.roomId}`);
        },
        [router]
    );

    return (
        <>
            <Typography.Title level={2}>
                Join room
            </Typography.Title>
            <Typography.Paragraph>
                Your device ID is: {myId}
            </Typography.Paragraph>
            <Form
                name="joinRoom"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item<FieldType>
                    label="Room ID"
                    name="roomId"
                    validateDebounce={500}
                    rules={[
                        () => ({
                            validator(rule, value) {
                                return new Promise((resolve, reject) => {

                                api.get<RoomIsPrivateFlag>(`/rooms/is-private/`, {params: {room_id: value}}).then(response => {
                                   if (response.status === 200) {
                                       reject('Room with given id already exists!')
                                    } else {
                                        reject('Unknown server error!');
                                    }
                                }).catch(({response}) => {
                                    console.log(response.status)
                                    if (response.status === 404) {
                                        resolve('');
                                    } else {
                                        reject('Unknown server error!');
                                    }
                                })
                                })
                                // return new Promise((resolve, reject) => {
                                //     request("/users/check", { username: value }).then(
                                //         (response) => {
                                //             if (response.data.exist) {
                                //                 reject("Username already exists.");
                                //             } else {
                                //                 resolve();
                                //             }
                                //         }
                                //     );
                                // });
                            }
                        }),
                        {required: true, message: 'Please input room ID!'}
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Join
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default JoinRoomForm;
