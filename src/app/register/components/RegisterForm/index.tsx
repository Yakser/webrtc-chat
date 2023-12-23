'use client';

import React, {useState} from "react";
import {
    Button,
    Form,
    Input,
    Typography,
} from 'antd';
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {register} from "@/utils/auth/thunk";

type Fields = {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    passwordRepeat: string,
};


const RegisterForm: React.FC = () => {
    const [form] = Form.useForm<Fields>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onFinish = (fields: Fields) => {
        setIsLoading(true);
        dispatch(register(fields)).then(response => {
            if (response.meta.requestStatus === 'fulfilled') {
                router.push('/login');
                setErrors([]);
            } else {
                // todo display correct erors from backend
                setErrors(['Some error just happened!']);
            }
        }).catch(() => {
            setErrors(['Oops! Unknown error!']);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <Typography.Title level={2}>
                Register
            </Typography.Title>
            <Form
                name="login"
                labelCol={{span: 10}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                autoComplete="off"
                onFinish={onFinish}
                form={form}

                labelAlign="left"
                labelWrap
            >
                <Form.Item<Fields>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please fill username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Email"
                    name="email"
                    rules={[{type: 'email', required: true, message: 'Please fill correct email!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="First name"
                    name="first_name"
                    rules={[{required: true, message: 'Please fill first name!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Last name"
                    name="last_name"
                    rules={[{required: true, message: 'Please fill last name!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Password"
                    name="password"
                    validateDebounce={500}
                    rules={[{required: true, message: 'Please fill your password!'},]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Repeat password"
                    name="passwordRepeat"
                    dependencies={['password']}
                    hasFeedback
                    validateDebounce={500}
                    rules={[{required: true, message: 'Please fill password again!'},
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.ErrorList errors={errors}/>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <br/>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
