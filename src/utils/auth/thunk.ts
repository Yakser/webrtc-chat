import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import api, {registerApi} from "@/utils/api";
import {
    getAccessToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken
} from "@/utils/api/tokens";
import {AppState} from "@/utils/auth/index";
import type {UserDetail, AuthTokenResponse} from "@/utils/api/types";

type UserEditableFields = Omit<UserDetail, 'id' | 'email'>
type LoginData = Pick<UserDetail, 'username' | 'password'>

export const fetchUserData = createAsyncThunk<UserDetail>(
    'auth/fetchUserData',
    async (_, {rejectWithValue}) => {
        try {
            const token = getAccessToken();
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
            }
            const {data} = await api.get('/users/current/');
            return data;
        } catch (e) {
            return rejectWithValue('');
        }
    });

export const editUserData = createAsyncThunk<UserDetail, UserEditableFields>(
    'auth/editUserData',
    async (payload, {rejectWithValue, getState}) => {
        try {
            const token = getAccessToken();
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
            }
            const {auth} = getState() as AppState;
            const userId = auth.user.id;
            const {data} = await api.put(`/users/${userId}/`, payload);
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue('');
        }
    });


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        delete api.defaults.headers.common['Authorization'];
        removeAccessToken();
        removeRefreshToken();
    }
);

export const register = createAsyncThunk<UserDetail, UserDetail>(
    'auth/register',
    async (payload, {rejectWithValue}) => {
        try {
            const response = await registerApi.post<UserDetail>('/users/', payload);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data);
            }
            return rejectWithValue({});
        }
    }
);
export const login = createAsyncThunk<UserDetail, LoginData>(
    'auth/login',
    async (payload, {dispatch}): Promise<UserDetail> => {
        const response = await api.post<AuthTokenResponse>('/auth/token/', payload);
        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return (await dispatch(fetchUserData())).payload as UserDetail;
    }
);

