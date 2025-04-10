import axios from 'axios';

axios.defaults.baseURL="http://localhost:8090"
axios.defaults.headers.post["Content-Type"]="application/json"

export const getAuthToken=()=>{
    return window.localStorage.getItem("auth_token");
};
export const setAuthToken=(token)=>{
    window.localStorage.setItem("auth_token",token);
};
export const request = (method, url, data) =>{
    let headers ={"Content-Type": "application/json"};
    if( getAuthToken()!= null && getAuthToken()!= "null"){
        headers = {"Authorization":`Bearer ${getAuthToken()}`};
        console.log("Auth Token:", getAuthToken());
        console.log("Headers envoyés :", headers);
    }
    return axios({method:method,
        headers:headers,
        url:url,
        data:data
    });
};