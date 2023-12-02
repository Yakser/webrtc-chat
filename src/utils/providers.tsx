'use client'

import {ReactNode} from 'react';
import {ConfigProvider, theme} from 'antd';


export function Providers({children}: { children: ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#1556ea',
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
}
