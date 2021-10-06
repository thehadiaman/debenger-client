import http from './httpService';
import config from "./config.json";

const apiEndPoint = `${config.apiUrl}/users`

export function signup(body){
    return http.post(apiEndPoint, {name: body.name, email: body.email, password: body.password});
}

export function verification(body){
    return http.post(`${apiEndPoint}/verification`, {verificationCode: body.verificationCode});
}

export async function getAccountData(){
    return (await http.get(`${apiEndPoint}/me`)).data;
}
