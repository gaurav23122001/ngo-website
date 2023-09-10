import React, { useEffect } from 'react'
// import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function Landing() {
    const history = useHistory();
    useEffect(()=>{
        const role=localStorage.getItem("role")
    const token=localStorage.getItem("token")
    if(role=="admin" && token){
        // handleLogin("admin")
        history.push("/admin/ngolist")
    }
    if(role=="vol" && token){
        history.push("/volunteer/dashboard")
        // handleLogin("vol")
    }
    if(role=="ngo" && token){
        history.push("/ngo/dashboard")
        // handleLogin("ngo")
    }

    },[])
    // const navigate = useNavigate();
    return (
        <div className=' h-screen flex flex-col justify-center items-center'>
            <div className='absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center' style={{ backgroundImage: `url(${require("./images/landing-image.jpg")})`, opacity: 0.86 }}></div>
            <div className='relative z-10'>
                <div className=' flex p-2 gap-4 items-center'>
                    <button className='rounded text-3xl bg-blue-200  px-4 py-2' onClick={() => history.push('/volunteer/login')}>Volunteer</button>
                    <button className='rounded  text-3xl bg-blue-200  px-4 py-2' onClick={() => history.push('/ngo/login')}>NGO</button>
                </div>
            </div>
        </div>

    )
}


export default Landing;