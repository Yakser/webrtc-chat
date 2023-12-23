export type AuthTokenResponse = {
    access: string,
    refresh: string,
}

export type UserDetail = {
    id: string | number,
    username: string,
    password: string,
    email: string,
    first_name: string,
    last_name: string,
}

export type RoomIsPrivateFlag = {
    is_private: boolean,
}