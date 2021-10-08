import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = '/auth';

export function login(body){
    return http.post(apiEndPoint, {email: body.email, password: body.password});
}

export function authUser(){
    try {
        const jwt = localStorage.getItem('jwtToken');
        return jwtDecode(jwt);
    }catch (ex) {}
}