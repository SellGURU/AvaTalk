import axios from "axios";
// import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    }
    if(response.status ==401 || response.status ==498 || response.data.detail == 'Unauthorized - User Not Found'||response.data.detail == 'Invalid or logged out token'||response.data.detail == 'Missing Authorization Header'||response.data.detail == 'Unauthorized - User does not match token' || response.data.detail == 'Signature has expired' || response.data.detail == 'Invalid crypto padding'|| response.data.detail =='Not enough segments'){
        localStorage.clear()
        window.location.reload(); 
    }    

    
    if(response.data.detail){
        if (response.data.detail && response.data.detail.toLowerCase().includes("successfully")) {
            toast.success(response.data.detail)
        }else {
            toast.error(response.data.detail) 
        }
    }
    return response;
}, (error) => {
    toast.dismiss()
    if(error.response.status ==401 || error.response.status ==498 ){
        localStorage.clear()
        window.location.reload(); 
    }    

    
    if(error.response.data.detail){
        if (error.response.data.detail && error.response.data.detail.toLowerCase().includes("successfully")) {
            toast.success(error.response.data.detail)
        }else {
            toast.error(error.response.data.detail) 
        }
    }    
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});