import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwtToken');

axios.interceptors.response.use(null, error => {

    const expectedError = error.response && error.response.status >= 400 && error.response.status <500;

    if(!expectedError){
        console.log(error);
    }

    return Promise.reject(error);

});

const defaults = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}

export default defaults;