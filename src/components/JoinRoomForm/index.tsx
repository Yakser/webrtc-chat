'use client';

import React, {useCallback} from "react";
import {Button, Form, Input, Typography} from "antd";
import {useRouter} from 'next/navigation';

type FieldType = {
    roomId: string;
};


const JoinRoomForm = () => {
    const router = useRouter();
    const [form] = Form.useForm();

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
                    rules={[{required: true, message: 'Please input room ID!'}]}
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
