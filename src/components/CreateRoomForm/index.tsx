'use client';

import React, {useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    Flex,
    Form,
    Input, Spin,
} from 'antd';
import {UserDetail} from "@/utils/api/types";
import api from "@/utils/api";
import {useAppSelector} from "@/utils/hooks/useAppSelector";

type Fields = {
    roomName: string;
    roomId: string;
    isPrivate: boolean;
    invitedUsers: string[];
};


const CreateRoomForm = () => {
    const [form] = Form.useForm<Fields>();
    const isPrivate = Form.useWatch('isPrivate', form);
    const [users, setUsers] = useState<UserDetail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {user} = useAppSelector(state => state.auth);

    useEffect(() => {
        setIsLoading(true);
        api.get<UserDetail[]>('/users/').then(response => {
            setUsers(response.data.filter(u => u.username != user.username));
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [user.username]);

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
                <Form.Item<Fields>
                    label="Room ID"
                    name="roomId"
                    rules={[{required: true, message: 'Please input room ID!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Room name"
                    name="roomName"
                    rules={[{required: true, message: 'Please fill room name!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    name="isPrivate"
                    valuePropName="checked"
                    wrapperCol={{offset: 8, span: 16}}
                >
                    <Checkbox>Is private?</Checkbox>
                </Form.Item>
                {
                    isPrivate && (
                        <Form.Item name="checkbox-group" label="Choose allowed users:">
                            {isLoading ? (
                                <Spin/>
                            ) : (
                                <Checkbox.Group>
                                    <Flex vertical>
                                        {
                                            Object.entries(users).map(([id, user]) => (
                                                <Checkbox key={id} value={id} style={{lineHeight: '32px'}}>
                                                    {user.username} ({user.first_name} {user.last_name})
                                                </Checkbox>
                                            ))
                                        }
                                    </Flex>
                                </Checkbox.Group>
                            )
                            }
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