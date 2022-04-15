import axios from 'axios';
import {Cloudinary} from "@cloudinary/url-gen";

const defaultUrl = "http://localhost:8000"

const cloudinaryId = new Cloudinary({
    cloud: {
        cloudName: 'dt9mpca3c',
    }
});

const httpPost = async (url, data) => {
    try {
        const response = await axios.post(`${defaultUrl}${url}`, data);
        return response.data;
    } catch(err) {
        throw err;
    }
}

const uploadImageAndGenerateUrl = () => {

}

export { httpPost };