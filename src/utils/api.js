import axios from 'axios';

const defaultUrl = "http://localhost:8000"


axios.defaults.withCredentials = true;

const httpPost = async (url, data, headers) => {
    try {
        const response = await axios.post(`${defaultUrl}${url}`, data, headers);
        return response.data;
    } catch(err) {
        throw err;
    }
}


const httpGet = async (url, headers) => {
    try {
        const response = await axios.get(`${defaultUrl}${url}`, headers);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export { httpPost, httpGet };