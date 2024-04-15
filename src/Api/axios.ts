import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    }
    if(response.status ==401 || response.status ==498 || response.data.detail == 'Unauthorized - User Not Found'||response.data.detail == 'Invalid or logged out token'||response.data.detail == 'Missing Authorization Header'||response.data.detail == 'Unauthorized - User does not match token'){
        localStorage.clear()
    }    
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});