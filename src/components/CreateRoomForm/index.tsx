'use client';

import React, {useState} from "react";
import {
    Button,
    Checkbox,
    Form,
    Input,
} from 'antd';
import {useRouter} from "next/navigation";
import api from "@/utils/api";

type Fields = {
    roomId: string;
    roomPassword: string;
    isPrivate: boolean;
};


const CreateRoomForm = () => {
    const [form] = Form.useForm<Fields>();
    const isPrivate = Form.useWatch('isPrivate', form);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onFinish = ({roomId, roomPassword, isPrivate}: Fields) => {
        setIsLoading(true);
        api.post('/rooms/', {
            password: roomPassword,
            room_id: roomId,
            is_private: isPrivate
        })
            .then(response => {
                if (response.status === 201) {
                    return router.push(`rooms/${roomId}`);
                }

                // todo: set errors

            })
            .catch(error => console.log(error))
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            <Form
                name="createRoom"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                autoComplete="off"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item<Fields>
                    label="Room ID"
                    name="roomId"
                    rules={[{required: true, message: 'Please input room ID!'}]}
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
                        <Form.Item<Fields>
                            label="Room password"
                            name="roomPassword"
                            rules={[{required: true, message: 'Please fill room password!', min: 3}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                    )
                }


                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateRoomForm;