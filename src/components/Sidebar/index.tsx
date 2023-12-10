'use client'

import React from 'react';

import {
    VideoCameraOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Typography} from 'antd';
import Link from "next/link";

const {Sider} = Layout;

type SidebarProps = {
    collapsed: boolean
}

const Sidebar: React.FC<SidebarProps> = ({collapsed}) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined/>,
                        label: <Link href={'/'}>Lobby</Link>,
                    },
                    {
                        key: '2',
                        icon: <VideoCameraOutlined/>,
                        label: <Link href={'/rooms'}>Create new room</Link>,
                    },
                ]}
            />
        </Sider>
    );
};

export default Sidebar;