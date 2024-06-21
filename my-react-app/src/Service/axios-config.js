import axios from "axios";
const baseURL = 'http://localhost:2005';  //baseURL spell should be same

const publicAxios=axios.create({baseURL});

const privateReq = axios.create({baseURL});

privateReq.interceptors.request.use((config) =>
{
    const token = localStorage.getItem("token");
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export {publicAxios,baseURL,privateReq}