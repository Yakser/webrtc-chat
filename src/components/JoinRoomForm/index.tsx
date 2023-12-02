'use client';

import React, {useCallback} from "react";
import {Button, Form, Input} from "antd";
import {useRouter} from 'next/navigation';

type FieldType = {
    username: string;
    roomId: string;
};


const JoinRoomForm = () => {
    const router = useRouter();
    const onFinish = useCallback(
        (values: FieldType) => {
            router.push(`rooms/${values.roomId}`);
        },
        [router]
    );


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="joinRoom"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>
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
    );
};

export default JoinRoomForm;