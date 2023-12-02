'use client'

import React, {useState} from 'react';
import Sidebar from "@/components/Sidebar";
import {Layout, theme} from "antd";
import Header from "@/components/Header";

type RootLayoutProps = {
    children: React.ReactNode;
}

const MainLayout: React.FC<RootLayoutProps> = ({children}) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sidebar collapsed={collapsed}/>
            <Layout>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Layout.Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;