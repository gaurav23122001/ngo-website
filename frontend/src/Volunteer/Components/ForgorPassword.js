import React from "react";
import '../../Auth.css';
import axios from "axios"
import { Form, Input, Button } from "antd";
import { useEffect, useState } from "react"
import { forgotPass, resetPass } from "../../Service/Api";
import { useHistory } from 'react-router-dom';

const Forgotpass = ({handleToggle}) => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [btnText, setBtnText] = useState("RECOVER");
    const [emailEditable, setEmailEditable] = useState(true);
    const [msg, setMsg] = useState(false);
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [otp, setOtp] = useState("");

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    const handleGoBack = () => {
        handleToggle(true);
      };

    async function handleRecover () {
        // api call to send otp
        console.log(btnText)
        if (email !== "" && btnText === "RECOVER") {
            const resp = await resetPass({email: email, role: 'vol'});
            if(resp.StatusCode === 200){
                setEmailEditable(false);
                const elements = document.getElementsByClassName("extraThree");
                for (let i = 0; i < elements.length; i++) {
                    elements[i].hidden = false;
                }
                setBtnText("CHANGE")
            }
            
        }
        else if (email !== "" && btnText === "CHANGE") {
            if (newPass !== confirmPass) {
                setMsg(true);
            }
            else if(newPass && confirmPass){
                //here backend call 
                const forgotRes = await forgotPass({email: email, newPassword: newPass, otp: otp, role: 'vol'})

                if(forgotRes.StatusCode === 200){
                    // handleGoBack();
                    window.location.reload();
                }
            }
        }
    }

    

    function handleEmail(event) {
        setEmail(event.target.value);
    }
    function handleOtp(event) {
        setOtp(event.target.value);
    }

    function handleNewPass(event) {
        setNewPass(event.target.value);
    }
    function handleConfirmPass(event) {
        setConfirmPass(event.target.value);
    }

    useEffect(() => {
        const elements = document.getElementsByClassName("extraThree");
        for (let i = 0; i < elements.length; i++) {
            elements[i].hidden = true;
        }
    }, [])

    return (
        <div className="login-page">
            <div className="login-box">
                {/* <div className="illustration-wrapper">
                    <img src={require("../../images/forrough.avif")} alt="Login" />
                </div> */}
                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <p className="form-title">Forgot Password! No Worries</p>
                    <Form.Item
                        name="useremail"
                        rules={[{ required: true, message: 'Please input your useremail!' }]}
                    >
                        <Input required onChange={(e) => handleEmail(e)} placeholder="Useremail" className="h-11 mt-12 " disabled={!emailEditable} />
                    </Form.Item>
                    <Form.Item
                        className="extraThree"
                        name="otp"
                        rules={[{ required: true, message: 'We have sent an OTP to your Email!' }]}
                    >
                        <Input required onChange={(e) => handleOtp(e)} placeholder="OTP" className="h-11 mt-5 " />
                    </Form.Item>
                    <Form.Item
                        className="extraThree"
                        name="newpass"
                        rules={[{ required: true, message: 'Please give a New Password!' }]}
                    >
                        <Input.Password required onChange={(e) => handleNewPass(e)} placeholder="New Password" className="h-11 mt-5 " />
                    </Form.Item>
                    <Form.Item
                        className="extraThree"
                        name="confirmpass"
                        rules={[{ required: true, message: 'Please confirm your Password!' }]}
                    >
                        <Input.Password required onChange={(e) => handleConfirmPass(e)} placeholder="Confirm Password" className="h-11 mt-5 " />
                    </Form.Item>

                    <Form.Item >
                                <a onClick={handleGoBack} className="underline">
                                    Go back
                                </a>
                            </Form.Item>

                    {
                        msg &&
                        <Form.Item>
                            <p>Password not matching with the given above</p>
                        </Form.Item>
                    }

                    <Form.Item>
                        <Button onClick={handleRecover} type="primary" htmlType="submit" className="login-form-button mt-8">
                            {btnText}
                        </Button>
                    </Form.Item>

                </Form>

            </div>

        </div>
    );
};

export default Forgotpass;
