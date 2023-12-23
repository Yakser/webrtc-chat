'use client';

import React from 'react';
import styles from './index.module.scss'
    ;
import Link from "next/link";
import {useAppSelector} from "@/utils/hooks/useAppSelector";
import {Button} from 'antd';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {logout} from "@/utils/auth/thunk";

type Props = {
    collapsed: boolean;
}

const UserCard: React.FC<Props> = ({collapsed}) => {
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout());
    }
    return (
        <div className={`${styles.userCard} ${collapsed && styles.userCard_collapsed}`}>
            {
                user.id ? (
                    <>
                        <Link className={styles.userCard__name} href={'/profile'} style={{
                            color: '#fff'
                        }}>
                            {user.first_name} {user.last_name}
                        </Link>
                        <Link href={'/profile'}>
                            <div className={styles.userCard__avatar}></div>
                        </Link>
                        <Button onClick={onLogout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => router.push('/login')}>
                            Login
                        </Button>
                        <Button onClick={() => router.push('/register')} type={'primary'}>
                            Register
                        </Button>
                    </>
                )
            }
        </div>
    );
};

export default UserCard;