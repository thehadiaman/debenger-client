import http from "./httpService";
import config from "./config.json";

const apiEndPoint = `${config.apiUrl}/debate`;

export async function getDebates(){
    return await http.get(apiEndPoint);
}

export async function getDebate(id){
    return (await http.get(`${apiEndPoint}/${id}`)).data;
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

export function deleteDebate(id){
    return http.delete(`${apiEndPoint}/${id}`);
}

export function updateDebate(id, body){
    return http.put(`${apiEndPoint}/${id}`, body);
}

export function saveDebate(body){
    return http.post(`${apiEndPoint}/`, body);
}
