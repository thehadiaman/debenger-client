import http from './httpService';

const apiEndPoint = '/users';

export function signup(body){
    return http.post(apiEndPoint, {name: body.name, email: body.email, password: body.password});
}

export function verification(body){
    return http.post(`${apiEndPoint}/verification`, {verificationCode: body.verificationCode});
}

export async function getAccountData(){
    return (await http.get(`${apiEndPoint}/me`)).data;
}

export async function getUserData(id){
    return (await http.get(`${apiEndPoint}/user/${id}`)).data;
}
