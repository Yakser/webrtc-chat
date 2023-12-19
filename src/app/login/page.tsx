import React from 'react';
import styles from './page.module.scss';
import Head from "next/head";
import LoginForm from "@/app/login/components/LoginForm";

const Page = () => {
    return (
        <section className={styles.login}>
            <Head>
                <title>webdev-lab | Вход</title>
            </Head>
            <h2 className={'title'}>Вход</h2>
            <LoginForm/>
        </section>
    );
};

export default Page;