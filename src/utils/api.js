import axios from 'axios';

const defaultUrl = "http://localhost:8000"

const httpPost = async (url, data) => {
    try {
        const response = await axios.post(`${defaultUrl}${url}`, data);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export { httpPost };