import axios from 'axios';
<<<<<<< HEAD
=======

>>>>>>> 4d75edf5835e3e1cd0563136c4f99db6b002146f

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