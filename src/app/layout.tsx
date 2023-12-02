import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import '@/scss/style.scss';
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import {Providers} from "@/utils/providers";

import React from "react";
import MainLayout from "@/components/MainLayout";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Lobby | webrtc-chat',
    description: 'Lobby',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className} style={{
            margin: 0,
            minHeight: "100vh",
        }}>
        <Providers>
            <StyledComponentsRegistry>
                <MainLayout>
                    {children}
                </MainLayout>
            </StyledComponentsRegistry>
        </Providers>
        </body>
        </html>
    )
}
