'use client';

import React, {useCallback, useContext, useEffect, useState} from "react";
import {Button, Form, Input, Typography} from "antd";
import {useRouter} from 'next/navigation';
import {getUsername} from "@/utils/helpers";
import {LocalStorageKeys} from "@/utils/constants";
import {usePeer} from "@/utils/hooks/usePeer";
import {useMediaStream} from "@/utils/hooks/useMediaStream";

type FieldType = {
    username: string;
    roomId: string;
};


const JoinRoomForm = () => {
    const router = useRouter();
    const {myId} = usePeer();
    const [ form ] = Form.useForm();

    const onFinish = useCallback(
        (values: FieldType) => {
            localStorage.setItem(LocalStorageKeys.USERNAME, values.username);
            router.push(`rooms/${values.roomId}`);
        },
        [router]
    );

    useEffect(() => {
        form.setFieldValue('username', getUsername());
    }, [form]);

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    extra={myId && `Your device ID is ${myId}` || 'Getting your device ID...'}
                    rules={[{required: true, message: 'Please input your username!'}]}
                    initialValue={'Anonymous'}
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
        </>
    );
};

export default JoinRoomForm;
