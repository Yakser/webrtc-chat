'use client'

import React from 'react';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Button, theme} from 'antd';


type HeaderProps = {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({collapsed, setCollapsed}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout.Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Layout.Header>
    );
};

export default Header;