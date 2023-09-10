import React, { useState, useRef, useEffect } from 'react';
// import "./Dashboard.css";
import { Modal, Button, Form, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { FaCheckCircle, FaEye, FaTrash } from 'react-icons/fa';

import axios from 'axios';
// import ProjectDisplay from '../Components/ngoModal';

const VolList = () => {

    const [volunteers, setVolunteers] = useState([
        { emailId: 'nithingshastry@gmail.com', displayName: 'Nithin G', comment: "asdf", hobby: ["asdf", "asdf", "!2341234"], skills: "ASDF", previousWork: "asdf", statusP: "asdf", createdAt: "asdf", isValidated: false },
    ])

    useEffect(() => {
        getData()
    }, [])

    const getData=async()=>{
        const volunteerData = await axios.post('http://localhost:5000/admin/fetchvol',{}, {
            headers: {
                authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res);
            setVolunteers(res.data.volList);
            console.log(volunteers);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="row">
            <div className='heading'>
                <h2>Volunteer</h2>
            </div>
            <div className="col-12">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">emailId</th>
                            <th scope="col">hobby</th>
                            <th scope="col">skills</th>
                            <th scope="col">previousWork</th>
                            <th scope="col">statusP</th>
                            <th scope="col">createdAt</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.map((volunteer, i) => (
                            <tr key={i}>
                                <td>{volunteer.displayName}</td>
                                <td>{volunteer.emailId}</td>
                                <td className='hobby-body'>{volunteer.hobby.map((h, i) => <div key={i} className='hobby'>{h}</div>)}</td>
                                <td>{volunteer.skills}</td>
                                <td>{volunteer.previousWork}</td>
                                <td>{volunteer.statusP}</td>
                                <td>{volunteer.createdAt}</td>
                                <td className='actions-cell'>
                                    <div className='actions'>
                                        <button className="btn btn-primary options" disabled={volunteer.isValidated ? true : false}><FaCheckCircle /></button>
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

export default VolList;