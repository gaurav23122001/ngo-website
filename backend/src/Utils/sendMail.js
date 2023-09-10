const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_API_KEY);

getVerificationMsg = function (otp) {
    let html = 'Hi,'

    html += `<br>Here is your OTP.`
    
    html += `<br><strong> Otp: </strong>` + otp
    html += `<br><br>Thank You!`
    html += `<br>Regards,`
    html += `<br>Gaurav`
    html += `<br><br>Arms Of Hope<strong></strong>` //change

    return html;

}

getAcceptMsg = function (role) {

    let role1 = '';
    if(role === 'vol'){
        role1 = 'Volunteer';
    } 
    else{
        role1 = 'NGO'
    }

    let html = 'Congratulations!!'

    html += `<br>You have been approved as ` + role1  
    html += `<br>Thanks for choosing us.`
    html += `<br><br>Thank You!`
    html += `<br>Regards,`
    html += `<br>Gaurav`
    html += `<br><br>Arms Of Hope<strong></strong>` //change

    return html;

}

getRejectMsg = function (role, comment) {

    let role1 = '';
    if(role === 'vol'){
        role1 = 'Volunteer';
    } 
    else{
        role1 = 'NGO'
    }

    let html = 'Hello,'

    html += `<br>We are sorry to inform you that your application as ` + role1 + ` has been rejected.`
    html += `<br>Comments: ` + comment
    html += `<br>Please try again accordingly.`
    html += `<br><br>Thank You!`
    html += `<br>Regards,`
    html += `<br>Gaurav`
    html += `<br><br>Arms Of Hope<strong></strong>` //change

    return html;

}

getResetMsg = function () {
    let html = 'Hi,'

    html += `<br>Your Password has been reset.`
    html += `<br><strong>If not done by you please contact admin.</strong>`
    html += `<br><br>Thank You!`
    html += `<br>Regards,`
    html += `<br>Gaurav`
    html += `<br><br>Arms Of Hope<strong></strong>`

    return html;

}

getUpdateMsg = function () {
    let html = 'Hi,'

    html += `<br>Your Profile has been updated.`
    html += `<br><strong>If not done by you please contact admin.</strong>`
    html += `<br><br>Thank You!`
    html += `<br>Regards,`
    html += `<br>Gaurav`
    html += `<br><br>Arms Of Hope<strong></strong>`

    return html;

}

const getMsg = function (email, subject, html) {
    let msg = {
        to: email,
        from: 'srivibhav.j@gmail.com', // Use the email address or domain you verified above
        subject: subject,
        html: html
    };

    return msg
}

const sendOtpMail = async function (email, otp) {
    try {
        let subject = "Account Verification"
        console.log(subject)
        let html = getVerificationMsg(otp)
        msg = getMsg(email, subject, html)
        return await sgMail
            .send(msg)
    }
    catch (e) {
        throw e
    }
}

const sendAcceptMail = async function (email, role) {
    try {
        let subject = "Account Verified!!"
        console.log(subject)
        let html = getAcceptMsg(role)
        msg = getMsg(email, subject, html)
        return await sgMail
            .send(msg)
    }
    catch (e) {
        throw e
    }
}

const sendRejectMail = async function (email, role, comment) {
    try {
        let subject = "Verification Status"
        console.log(subject)
        let html = getRejectMsg(role, comment)
        msg = getMsg(email, subject, html)
        return await sgMail
            .send(msg)
    }
    catch (e) {
        throw e
    }
}

const sendResetMail = async function (email) {
    try {
        let subject = "Account Reset"
        console.log(subject)
        let html = getResetMsg()
        msg = getMsg(email, subject, html)
        return await sgMail
            .send(msg)
    }
    catch (e) {
        throw e
    }
}

const sendUpdateMail = async function (email) {
    try {
        let subject = "Account Reset"
        console.log(subject)
        let html = getUpdateMsg()
        msg = getMsg(email, subject, html)
        return await sgMail
            .send(msg)
    }
    catch (e) {
        console.log(e);
        throw e
    }
}


module.exports = {
    sendOtpMail,
    sendResetMail,
    sendUpdateMail,
    sendAcceptMail,
    sendRejectMail
}