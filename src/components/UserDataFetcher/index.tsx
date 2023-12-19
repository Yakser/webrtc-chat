'use client';

import React from 'react';

import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {useAppSelector} from "@/utils/hooks/useAppSelector";
import {getAccessToken} from "@/utils/api/tokens";
import {fetchUserData, logout} from "@/utils/auth/thunk";


const UserDataFetcher = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const token = getAccessToken();

    useEffect(() => {
        if (token && !user.id) {
            dispatch(fetchUserData());
        } else if (!token) {
            dispatch(logout());
            router.push("/login");
        }
    }, [user.id, dispatch, router, token]);

    return <></>;

};

export default UserDataFetcher;

