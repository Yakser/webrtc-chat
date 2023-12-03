'use client';

import React from "react";
import {Button, Form, Input} from "antd";
import {LocalStorageKeys} from "@/utils/constants";

const onFinish = (values: any) => {
    localStorage.setItem(LocalStorageKeys.USERNAME, values.username);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username: string;
};


const FillUsernameForm = () => {
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
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please fill username!'}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FillUsernameForm;