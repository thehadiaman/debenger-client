import http from "./httpService";

const apiEndPoint = '/debate';

export async function getDebates(page=1){
    return await http.get(`${apiEndPoint}/?page=${page}`);
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

export async function getMyDebates(page, id){
    return (await http.get(`${apiEndPoint}/mydebates/?page=${page}&&id=${id}`));
}

export async function searchDebate(search_query){
    return http.get(`${apiEndPoint}/search/${search_query}`);
}

export async function sendMessage(id, body){
    return http.post(`${apiEndPoint}/message/${id}`, {message: body});
}
