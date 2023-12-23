import React from 'react';
import styles from './page.module.scss';
import LoginForm from "@/app/login/components/LoginForm";

const Page = () => {
    return (
        <section className={styles.login}>
            <LoginForm/>
        </section>
    );
};

export default Page;