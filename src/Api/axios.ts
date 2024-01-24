import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    }
    return response;
}, (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});