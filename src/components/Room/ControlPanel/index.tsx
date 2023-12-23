'use client';

import React from 'react';
import {Button} from "antd";
import {useRouter} from "next/navigation";
import styles from './index.module.scss';

const ControlPanel = () => {
    const router = useRouter();

    const onLeave = () => {
        router.push('/');
    };

    return (
        <div className={styles.panel}>
            <Button type="primary" danger onClick={onLeave}>
                Leave
            </Button>
        </div>
    );
};

export default ControlPanel;