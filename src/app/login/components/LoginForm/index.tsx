'use client';

import React, {useState} from "react";
import {
    Button,
    Form,
    Input,
} from 'antd';
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {login} from "@/utils/auth/thunk";

type Fields = {
    username: string;
    password: string;
};


const LoginForm: React.FC = () => {
    const [form] = Form.useForm<Fields>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onFinish = ({username, password}: Fields) => {
        setIsLoading(true);
        dispatch(login({username, password})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                router.push('/');
                setErrors([]);
            } else {
                setErrors(['Wrong password or username!']);
                // setError("root", {message: 'Неверный псевдоним или пароль!'});
            }
        }).catch(() => {
            setErrors(['Oops! Unknown error!']);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <Form
                name="login"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                autoComplete="off"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item<Fields>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please fill username!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<Fields>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please fill your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.ErrorList errors={errors}/>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;