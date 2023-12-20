'use client';

import React from 'react';

import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {useAppSelector} from "@/utils/hooks/useAppSelector";
import {getAccessToken} from "@/utils/api/tokens";
import {fetchUserData, logout} from "@/utils/auth/thunk";
import {usePathname} from "next/dist/client/components/navigation";


const UserDataFetcher = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = getAccessToken();

        if (token && !user.id) {
            dispatch(fetchUserData());
        } else if (!token) {
            dispatch(logout());

            if (pathname !== '/register') {
                router.push("/login");
            }
        }
    }, [user.id, dispatch, router, pathname]);

    return <></>;

};

export default UserDataFetcher;

