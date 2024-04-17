'use client';

import React from "react";
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

    const onFinish = (values: FieldType) => {
        router.push(`rooms/${values.roomId}`);
    }

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

                                    api.get<RoomIsPrivateFlag>(`/rooms/is-private/`, {params: {room_id: value}}).then(() => {
                                        resolve('')
                                    }).catch(({response}) => {
                                        if (response.status === 404) {
                                            reject('Room with given id does not exist!');
                                        } else {
                                            reject('Unknown server error!');
                                        }
                                    })
                                })
                            }
                        }),
                        {required: true, message: 'Please fill room id!'}
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}} shouldUpdate>
                    {
                        () => (
                            <Button type="primary" htmlType="submit"  disabled={
                                !form.isFieldsTouched(true) ||
                                form.getFieldsError().filter(({ errors }) => errors.length)
                                    .length > 0
                            }>
                                Join
                            </Button>
                        )
                    }

                </Form.Item>
            </Form>
        </>
    );
};

export default JoinRoomForm;
