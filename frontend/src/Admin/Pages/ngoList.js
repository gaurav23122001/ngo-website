import React, { useState, useRef, useEffect } from 'react';
// import "./Dashboard.css";
import { Modal, Button, Form, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { FaCheckCircle, FaEye, FaTrash } from 'react-icons/fa';

import axios from 'axios';


const NgoList = () => {

    const [ngos, setNgos] = useState([
        { googleId: 1, emailId: 'blueworld@gmail.com', otp: '1234', displayName: 'BlueWorld', firstName: 'BlueWorld', NGOName: 'asdf', NGOImage: 'asdf234adsf', image: 'adsf234f', rating: 5, password: '345', peopleRated: 324, address: "Kolkata", isValidated: true, contact: "3412534426", description: "saving water", motto: "saving water", status: "asdf", comment: "asdf", resetotp: "asdf", projects: ["1234", "!234", "1234"], createdAt: "12-12-12" },
        { googleId: 1, emailId: 'unicef@outlook.com', otp: '1234', displayName: 'UNICEF', firstName: 'BlueWorld', NGOName: 'asdf', NGOImage: 'asdf234adsf', image: 'adsf234f', rating: 5, password: '345', peopleRated: 324, address: "Kolkata", isValidated: true, contact: "3412534426", description: "world org", motto: "UNICEF", status: "asdf", comment: "asdf", resetotp: "asdf", projects: ["1234", "!234", "1234"], createdAt: "12-12-12" },
    ]);

    useEffect(() => {
        getData()
    }, [])

    const getData=async()=>{
        const ngoData = await axios.post('http://localhost:5000/admin/fetchngo',{}, {
            headers: {
                authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res);
            setNgos(res.data.ngoList);
            console.log(ngos);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // const setAccepted=async()=>{
    //     const ngoData = await axios.post('http://localhost:5000/admin/fetchngo',{}, {
    //         headers: {
    //             authorization: `Token ${localStorage.getItem("token")}`
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         setNgos(res.data.ngoList);
    //         console.log(ngos);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }


    return (
        <div className="row">
            <div className="col-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">emailId</th>
                            <th scope="col">rating</th>
                            <th scope="col">contact</th>
                            <th scope="col">description</th>
                            <th scope="col">motto</th>
                            <th scope="col" colSpan={3}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ngos.map((ngo, i) => (
                            <tr key={i}>
                                <td>{ngo.NGOName}</td>
                                <td>{ngo.emailId}</td>
                                <td>{ngo.rating}</td>
                                <td>{ngo.contact}</td>
                                <td>{ngo.description}</td>
                                <td>{ngo.motto}</td>
                                <td className='actions-cell'>
                                    <div className='actions'>
                                        <button className="btn btn-primary options" disabled={ngo.isValidated ? true : false} ><FaCheckCircle /></button>
                                        <button className="btn btn-success options"><FaEye /></button>
                                        <button className="btn btn-danger"><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default NgoList;