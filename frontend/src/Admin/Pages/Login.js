import React from "react";
import axios from "axios"
import { useGoogleLogin } from "@react-oauth/google";
import '../../Auth.css';
import { Form, Input, Button } from "antd";
import { NavLink } from "react-router-dom";
import Forgotpass from "../Components/ForgorPassword";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { adminLogin } from "../../Service/Api";

const Login = ({onLogin}) => {
    // const navigate=useNavigate();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [tog, setTog] = useState(true);
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleGoogleLoginSuccess = async (tokenResponse) => {
        const access_token = tokenResponse.access_token
        const { data } = await axios.post(`http://localhost:5000/admin/login`, {
            googleAccessToken: access_token
        })
        console.log(data)
        history.push("/admin/profile");
        localStorage.setItem("token",data.token)
        localStorage.setItem("role","admin")
        onLogin();

        // navigate("/vol/profile");
    }

    const handleLog = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess, onError: (err) => console.log(err) });

    // useEffect(() => {

    //     setTog(true);
    // }, [])

    async function handleManLog() {
        if (email !== "" && pass !== "") {
            const data = new URLSearchParams();
            data.append("email", email);
            data.append("password", pass);
            const response = await adminLogin(data);
            console.log(response)
            console.log("here is the response in Register.js ", response);
            if (response.StatusCode === 200) {
                history.push('/admin/profile');
                localStorage.setItem("token",response.token)
                localStorage.setItem("role","admin")
                onLogin()
                // navigate("/vol/profile");
            }
            else if (response.StatusCode === 400) {
                alert("Email or Password Incorrect");
            }
            else if (response.StatusCode === 500) {
                alert("some error occured, please try again")
            }
        }
    }

    const handleToggle = (value) => {
        setTog(value);
    };

    return (
        <>
            {
                tog &&
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
                            <p className="form-title">Welcome back</p>
                            <p>Login to the Dashboard</p>
                            <Form.Item
                                name="useremail"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Useremail" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
                            </Form.Item>

                            {/* <Form.Item name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                            <Form.Item >
                                <a onClick={() => setTog(false)} className="underline">
                                    Forgot Password
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button onClick={handleManLog} type="primary" htmlType="submit" className="login-form-button">
                                    LOGIN
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={handleLog} type="primary" className="login-form-button">
                                    LOGIN WITH GOOGLE
                                </Button>
                            </Form.Item>
                            {/* <Form.Item >
                                <NavLink to="/admin/register" className="underline">
                                    Create Account
                                </NavLink>
                            </Form.Item> */}
                        </Form>

                    </div>

                </div>
            }
            {
                !tog &&
                <Forgotpass handleToggle={handleToggle} />
            }
        </>
    );
};

export default Login;
