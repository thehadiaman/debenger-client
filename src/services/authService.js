import http from "./httpService";
import config from "./config.json";

const apiEndPoint = `${config.apiUrl}/auth`;

export function login(body){
    return http.post(apiEndPoint, {email: body.email, password: body.password});
}

export function authToken(){
    return localStorage.getItem('jwtToken');
}