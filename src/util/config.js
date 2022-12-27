import axios from "axios";
import { isExpired } from "react-jwt";
import { toast } from "react-toastify";
import { history } from "../index.js";
export const ACCESS_TOKEN = 'accessToken'
export const USER_LOGIN = 'userLogin'
export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjE5LzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDQ1NDQwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg0NjAyMDAwfQ.49m9-EoDr6zr7UOk_79hfcvJWKI_s0Wy_g40ossfl9c'
export const TOKEN_FACEBOOK = 'facebookToken';
export const USER_CART = [];
export const USER_PROFILE = 'userProfile';


export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } = {
    // save data as string
    saveStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue)
    },
    // save data as object
    saveStoreJson: (name, value) => {
        const convertValue = JSON.stringify(value)
        localStorage.setItem(name, convertValue)
        return value
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
        return null
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            return JSON.parse(localStorage.getItem(name))
        }
        return null
    },
    removeStore: (name) => {
        if (localStorage.getItem(name)) {
            localStorage.removeItem(name);
        }
    },

}

export const http = axios.create({
    baseURL: 'https://shop.cyberlearn.vn',
    timeout: 30000
})

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
        TokenCybersoft: TOKEN_CYBERSOFT,
        ContentType: 'text/json'
    };
    return config;
}, (err) => {
    return Promise.reject(err);
})

http.interceptors.response.use((res) => {
    return res;
}, (err) => {
    //Bắt lỗi 400 hoặc 404
    if (err.response?.status === 400 || err.response?.status === 404) {
        //Lỗi do tham số => backend trả về 400 hoặc 404 mình sẽ xử lý
        toast.error("Sai tài khoản || Sai mật khẩu", "ERROR");
        //chuyển hướng về home
        history.push('/login');
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
        const isMyTokenExpired = isExpired(getStore(ACCESS_TOKEN));
        if (isMyTokenExpired) {
            toast.error("Hết phiên đăng nhập yêu cầu đăng nhập lại !", 'ERROR');
            removeStore(ACCESS_TOKEN);
            removeStore(USER_LOGIN);
            window.location.href = '/login';
        }
        history.push('/login');
    }
    return Promise.reject(err);
})


