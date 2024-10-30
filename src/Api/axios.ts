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
    if(error.status) {
         toast.dismiss()
    }
    if(error.status ==401 || error.status ==498 || error.data.detail == 'Unauthorized - User Not Found'||error.data.detail == 'Invalid or logged out token'||error.data.detail == 'Missing Authorization Header'||error.data.detail == 'Unauthorized - User does not match token' || error.data.detail == 'Signature has expired' || error.data.detail == 'Invalid crypto padding'|| error.data.detail =='Not enough segments'){
        localStorage.clear()
        window.location.reload(); 
    }    

    
    if(error.data.detail){
        if (error.data.detail && error.data.detail.toLowerCase().includes("successfully")) {
            toast.success(error.data.detail)
        }else {
            toast.error(error.data.detail) 
        }
    }    
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});