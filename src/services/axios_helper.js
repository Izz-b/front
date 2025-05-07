import axios from 'axios';

axios.defaults.baseURL="http://localhost:8090"
axios.defaults.headers.post["Content-Type"]="application/json"

export const getAuthToken=()=>{
    return window.localStorage.getItem("auth_token");
};
export const setAuthToken = (token) => {
    if (token) {
        window.localStorage.setItem("auth_token", token);
    } else {
        window.localStorage.removeItem("auth_token");
    }
};
export const request = (method, url, data) => {
    const token = getAuthToken();
    let headers = { "Content-Type": "application/json" };

    if (token && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
        //console.log("Auth Token:", token);
    }
    //console.log("Headers envoyés :", headers);
    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    });
};