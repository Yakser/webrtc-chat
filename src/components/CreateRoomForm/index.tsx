'use client';

import React, {useContext} from "react";
import {
    Button,
    Checkbox,
    Flex,
    Form,
    Input,
} from 'antd';
import {UsersListContext} from "@/contexts/UsersListContext";

type FieldType = {
    roomName: string;
    roomId: string;
    isPrivate: boolean;
    invitedUsers: string[];
};


const CreateRoomForm = () => {
    const [form] = Form.useForm();
    const isPrivate = Form.useWatch('isPrivate', form);
    // fixme: this is incorrect, we should save all connections, not users connected after us
    const users = useContext(UsersListContext);

    return (
        <>
            <Form
                name="createRoom"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
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
                <Form.Item<FieldType>
                    label="Room name"
                    name="roomName"
                    rules={[{required: true, message: 'Please fill room name!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    name="isPrivate"
                    valuePropName="checked"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox>Is private?</Checkbox>
                </Form.Item>
                {
                    isPrivate && (
                        <Form.Item name="checkbox-group" label="Choose allowed users:">
                            <Checkbox.Group>
                                <Flex vertical>
                                    {
                                        users.map((item, index) => (
                                            <Checkbox key={index} value={{item}} style={{lineHeight: '32px'}}>
                                                {item.name}
                                            </Checkbox>
                                        ))
                                    }
                                </Flex>
                            </Checkbox.Group>
                        </Form.Item>
                    )
                }
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateRoomForm;