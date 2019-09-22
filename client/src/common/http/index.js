import axios from 'axios';
import router from "../../router";
import store from '../../store';

axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.withCredentials = true;
// 请求拦截
axios.interceptors.request.use(
    config => {
        if (localStorage.eleToken) {
            // 设置统一的请求头
            config.headers.Authorization = localStorage.eleToken;
        }
        if (config.url === "/img") {
            return false;
        } else {

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    response => {

        return response;
    },
    error => {
        const {status} = error.response;
        if (status === 401) {
            // 清除token
            localStorage.removeItem("eleToken");
            store.commit('setUser', null);
            router.push('/about/login');
        }
        return Promise.reject(error);
    }
);
export default axios;
