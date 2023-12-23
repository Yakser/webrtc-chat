'use client';

import {useEffect} from "react";
import {useRouter} from 'next/navigation';
import {useAppDispatch} from "@/utils/hooks/useAppDispatch";
import {useAppSelector} from "@/utils/hooks/useAppSelector";
import {getAccessToken} from "@/utils/api/tokens";
import {fetchUserData, logout} from "@/utils/auth/thunk";


// todo

const useUser = () => {
    const dispatch = useAppDispatch();
    const {user: userFromState} = useAppSelector((state) => state.auth);
    const router = useRouter();
    const token = getAccessToken();

    useEffect(() => {
        if (token && !userFromState.id) {
            dispatch(fetchUserData()).then(value => {
                value.payload
            });
        } else if (!token) {
            dispatch(logout());
            router.push("/login");
        }
    }, [userFromState.id, dispatch, router, token]);

    return {};

};

export default useUser;

