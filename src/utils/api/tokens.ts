export const getAccessToken = (): string => {
    return localStorage.getItem('access_token') || '';
};

export const setAccessToken = (token: string) => {
    localStorage.setItem('access_token', token);
};

export const removeAccessToken = () => {
    localStorage.removeItem('access_token');
};


export const getRefreshToken = (): string => {
    return localStorage.getItem('refresh_token') || '';
};

export const setRefreshToken = (token: string) => {
    localStorage.setItem('refresh_token', token);
};

export const removeRefreshToken = () => {
    localStorage.removeItem('refresh_token');
};




