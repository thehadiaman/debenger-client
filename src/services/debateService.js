import http from "./httpService";
import config from "./config.json";

const apiEndPoint = `${config.apiUrl}/debate`;

export async function getDebates(){
    return await http.get(apiEndPoint);
}

export function followDebate(id){
    return http.get(`${apiEndPoint}/follow/${id}`);
}

export function unfollowDebate(id){
    return http.get(`${apiEndPoint}/unfollow/${id}`);
}

export function like(id){
    return http.get(`${apiEndPoint}/like/${id}`);
}