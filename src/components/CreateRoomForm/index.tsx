'use client';

import React from "react";
import {Button, Form, Input} from "antd";

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    roomName: string;
    roomId: string;
};


const JoinRoomForm = () => {
    return (
        <Form
            name="createRoom"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Room ID"
                name="roomId"
                rules={[{required: true, message: 'Please input room ID!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<FieldType>
                label="Room name"
                name="roomName"
                rules={[{required: true, message: 'Please fill room name!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JoinRoomForm;