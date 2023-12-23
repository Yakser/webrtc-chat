import {createSlice} from '@reduxjs/toolkit';
import {editUserData, fetchUserData, login, logout, register} from './thunk';
import {UserDetail} from "@/utils/api/types";

export interface AppState {
    auth: AuthState;
}

export interface AuthState {
    user: UserDetail;
}

const initialState = {
    user: {},
} as AuthState;

const emptyUser: UserDetail = {
    id: '',
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
};

export const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(
                fetchUserData.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            );

            builder.addCase(
                fetchUserData.rejected, (state) => {
                    state.user = emptyUser
                }
            );

            builder.addCase(
                fetchUserData.pending, (state) => {
                    state.user = emptyUser
                }
            );

            builder.addCase(
                editUserData.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            );

            builder.addCase(
                logout.fulfilled, (state) => {
                    state.user = emptyUser;
                }
            );

            builder.addCase(
                register.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            );
            builder.addCase(
                login.fulfilled, (state, action) => {
                    state.user = action.payload;
                }
            );
        },
    })
;


// export const {} = authSlice.actions;

export default authSlice.reducer;
