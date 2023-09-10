// const VolModel = require("../../../Models/VolunteerModel");
const jwt = require("jsonwebtoken");
const AdminModel = require("../../Models/AdminModel");
const NGOModel = require("../../Models/NGOModel");
const { sendOtpMail, sendResetMail } = require("./sendMail");
const VolunteerModel = require("../../Models/VolunteerModel");
const sha512 = require('js-sha512');

const generateOtp = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const resetPassword = async(req, res) => {
    const { email, role } = req.body;
    if(role === 'admin'){
        let findUser = await AdminModel.findOne({ emailId: email });
        if(findUser){
            const otp = generateOtp(6);
            try{
                await AdminModel.updateOne({emailId: email}, {resetotp: otp});
                sendOtpMail(email, otp);
                res.send({StatusCode:200,msg: "Success"});
            }
            catch(err){
                res.send({StatusCode:500,msg: "Internal Server error"})
            }
           
        }
        else{
            res.send({StatusCode:400,msg: "User doesn't exist"});
        }
    }
    else if(role === 'ngo'){
        let findUser = await NGOModel.findOne({ emailId: email });
        if(findUser){
            const otp = generateOtp(6);
            try{
                await NGOModel.updateOne({emailId: email}, {resetotp: otp});
                sendOtpMail(email, otp);
                res.send({StatusCode:200,msg: "Success"});
            }
            catch(err){
                res.send({StatusCode:500,msg: "Internal Server error"})
            }
           
        }
        else{
            res.send({StatusCode:400,msg: "User doesn't exist"});
        }
    }
    else if(role === 'vol'){
        let findUser = await VolunteerModel.findOne({ emailId: email });
        if(findUser){
            const otp = generateOtp(6);
            try{
                await VolunteerModel.updateOne({emailId: email}, {resetotp: otp});
                sendOtpMail(email, otp);
                res.send({StatusCode:200,msg: "Success"});
            }
            catch(err){
                res.send({StatusCode:500,msg: "Internal Server error"})
            }
           
        }
        else{
            res.send({StatusCode:400,msg: "User doesn't exist"});
        }
    }
    else{
        res.send({StatusCode:400,msg: "Invalid"});
    }
}

const verifyResetOtp = async(req, res) => {
    const { newPassword, otp, email, role } = req.body;
    let newPass=sha512(newPassword+process.env.SHA_SECRET)
    if(role === 'admin'){
        let findUser = await AdminModel.findOne({ emailId: email });
        if(findUser){
            const resetotp=findUser.resetotp
            if(resetotp===otp){
                await AdminModel.updateOne({emailId:email},{password:newPass})
                sendResetMail(email)
                res.send({StatusCode:200,msg:"Password reset successfully"})
            }
            else{
                res.send({StatusCode:400,msg:"OTP incorrect"})
            }
        }
        else{
            res.send({StatusCode:400,msg:"Invalid Email"})
        }
    }
    else if(role === 'vol'){
        let findUser = await VolunteerModel.findOne({ emailId: email });
        if(findUser){
            const resetotp=findUser.resetotp
            console.log(resetotp,"hy ",otp)
            if(resetotp===otp){
                await VolunteerModel.updateOne({emailId:email},{password:newPass})
                sendResetMail(email)
                res.send({StatusCode:200,msg:"Password reset successfully"})
            }
            else{
                res.send({StatusCode:400,msg:"OTP incorrect"})
            }
        }
        else{
            res.send({StatusCode:400,msg:"Invalid Email"})
        }
    }
    else if(role === 'ngo'){
        let findUser = await NGOModel.findOne({ emailId: email });
        if(findUser){
            const resetotp=findUser.resetotp
            if(resetotp===otp){
                await NGOModel.updateOne({emailId:email},{password:newPass})
                sendResetMail(email)
                res.send({StatusCode:200,msg:"Password reset successfully"})
            }
            else{
                res.send({StatusCode:400,msg:"OTP incorrect"})
            }
        }
        else{
            res.send({StatusCode:400,msg:"Invalid Email"})
        }
    }
    else{
        res.send({StatusCode:500,msg:"Error"})
    }
}

module.exports = 
{
    generateOtp,
    resetPassword,
    verifyResetOtp
}