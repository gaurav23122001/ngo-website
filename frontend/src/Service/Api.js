import axios from 'axios'

const API_URI='http://localhost:5000';

export const volRegister=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/vol/register`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}
export const verifyOTPngo=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/ngo/addngo`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}
export const ngoRegister=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/ngo/register`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}
export const volLogin=async(dat)=>{
    try{
        const {data}=await axios.post(`${API_URI}/vol/loginemail`,dat);
        // console.log("here is the reponse in api.js ",response);
        console.log(data);
        return data;
    }catch(err){
        console.log("Error while calling API " , err.message);
    }
}
export const adminLogin=async(dat)=>{
    try{
        const {data}=await axios.post(`${API_URI}/admin/loginemail`,dat);
        // console.log("here is the reponse in api.js ",response);
        console.log(data);
        return data;
    }catch(err){
        console.log("Error while calling API " , err.message);
    }
}

export const ngoLogin=async(dat)=>{
    try{
        const {data}=await axios.post(`${API_URI}/ngo/loginemail`,dat);
        // console.log("here is the reponse in api.js ",response);
        console.log(data);
        return data;
    }catch(err){
        console.log("Error while calling API " , err.message);
    }
}
export const verifyOTP=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/vol/addvolunteer`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}

export const resetPass=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/common/resetpassword`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}

export const forgotPass=async(dat)=>{
    try {
        const {data}=await axios.post(`${API_URI}/common/verifyResetOtp`,dat);
        // console.log("here is the reponse in api.js ",response);
        return data;
    } catch (error) {
        console.log("Error while calling API " , error.message);
    }
}
