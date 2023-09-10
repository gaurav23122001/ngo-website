import React from "react";
import axios from "axios"
import '../../Auth.css';
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { volRegister, verifyOTP } from "../../Service/Api";
import { useHistory } from 'react-router-dom';

const Register = ({onLogin}) => {
    const history = useHistory();
    const [showSignUp, setShowSignUp] = useState(false);
    const [showGetOTP, setShowGetOTP] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [editable, setEditable] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [msg, setMsg] = useState(false);
    const [OTP, setOTP] = useState();
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    async function handleGetOTP() {
        if (editable === false && OTP) {
            //have to verify the otp
            const data = new URLSearchParams();
            data.append("email", email);
            data.append("otp", OTP);
            const response = await verifyOTP(data);
            if (response.StatusCode === 200) {
                history.push("/volunteer/login");
            }
            else {
                alert("check your email id and otp")
            }
        }
        else if (name !== "" && email !== "" && pass !== "") {
            const data = new URLSearchParams();
            data.append("name", name);
            data.append("email", email);
            data.append("password", pass);
            const response = await volRegister(data);
            console.log("here is the response in Register.js ", response);
            if (response.StatusCode === 200) {
                setShowGetOTP(false);
                setShowSignUp(true)
                setShowOTP(true);
                setEditable(false);
            }
            else if (response.StatusCode === 400) {
                alert("user already exists");
            }
            else if (response.StatusCode === 500) {
                alert("some error occured, please try again")
            }
        }
        else {
            setMsg(true);
        }
    }
    function handleName(event) {
        setName(event.target.value);
        setMsg(false);
    }
    function handleEmail(event) {
        setEmail(event.target.value);
        setMsg(false);
    }
    function handlepPass(event) {
        setPass(event.target.value);
        setMsg(false);
    }


    useEffect(() => {
        setShowOTP(false);
        setShowSignUp(false);
        setShowGetOTP(true);
    }, []);


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
                    <p className="form-title">Welcome</p>
                    <Form.Item
                        className="firstThree"
                        name="username"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input onChange={(e) => handleName(e)} disabled={!editable} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        className="firstThree"
                        name="useremail"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input type="email" onChange={(e) => handleEmail(e)} disabled={!editable} placeholder="Useremail" />
                    </Form.Item>

                    <Form.Item
                        className="firstThree"
                        name="password"
                        rules={[{ required: true, message: '' }]}
                    >
                        <Input.Password onChange={(e) => handlepPass(e)} disabled={!editable} placeholder="Password" />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}



                    {
                        showOTP &&
                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: 'Please input your OTP!' }]}
                        >
                            <Input required onChange={(e) => setOTP(e.target.value)} placeholder="OTP" />
                        </Form.Item>
                    }
                    {
                        msg &&
                        <Form.Item>
                            <p>Please fill all the fields</p>
                        </Form.Item>
                    }

                    {
                        showSignUp &&
                        <Form.Item  >
                            <Button onClick={handleGetOTP} type="primary" htmlType="submit" className="login-form-button">
                                SIGN UP
                            </Button>
                        </Form.Item>
                    }

                    {
                        showGetOTP &&
                        <Form.Item >
                            <Button onClick={handleGetOTP} type="primary" htmlType="submit" className="login-form-button">
                                GET OTP
                            </Button>
                        </Form.Item>
                    }


                </Form>

            </div>

        </div>
    );
};

export default Register;
