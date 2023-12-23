import React from 'react';
import styles from './page.module.scss';
import RegisterForm from "@/app/register/components/RegisterForm";

const Page = () => {
    return (
        <section className={styles.register}>
            <RegisterForm/>
        </section>
    );
};

export default Page;