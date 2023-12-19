'use client';

import React from 'react';
import styles from './index.module.scss'
    ;
import Link from "next/link";
import {useAppSelector} from "@/utils/hooks/useAppSelector";

type Props = {
    collapsed: boolean;
}

const UserCard: React.FC<Props> = ({collapsed}) => {
    const {user} = useAppSelector((state) => state.auth);
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
                    </>
                ) : (
                    <>
                        <Link href={'/login'}>
                            Войти
                        </Link>
                        <Link href={'/register'}>
                            Зарегистрироваться
                        </Link>
                    </>
                )
            }
        </div>
    );
};

export default UserCard;