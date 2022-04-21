import axios from 'axios';
import {Cloudinary} from "@cloudinary/url-gen";

const defaultUrl = "http://localhost:8000"


const httpPost = async (url, data, headers) => {
    try {
        console.log({ url, data, headers });
        const response = await axios.post(`${defaultUrl}${url}`, data, headers);
        return response.data;
    } catch(err) {
        throw err;
    }
}

export { httpPost };