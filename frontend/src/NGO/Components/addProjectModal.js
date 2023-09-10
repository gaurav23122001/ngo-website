import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';

import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './addProjectModal.css';




const ModalNgo = ({ closeModal }) => {

    const [projectName, setProjectName] = useState('');
    const [desc, setDesc] = useState('');
    const [motto, setMotto] = useState('');
    const [numVol, setNumVol] = useState(0);
    const [place, setPlace] = useState('');
    const [imageurl, setImageurl] = useState('');

    const handleCancel = () => {

        closeModal();

    };

    const handleSubmit = async () => {
        const newProject = {
            projectName: projectName,
            description: desc,
            motto: motto,
            numOfOpenings: numVol,
            place: place,
            projectImage: imageurl
        }

        await axios.post('http://localhost:5000/ngo/addproject', newProject, {
            headers: {
                authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            if(res.status === 200){
                window.location.reload();
            }
            else{
                alert('Project Not Added');
            }
        })
        .catch(err => alert('Server not found'))
    }



    return (

        <div className="example">

            <Modal show={true} onHide={handleCancel}>

                <Modal.Header closeButton>

                    <Modal.Title>Add Project</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicText">

                            <Form.Label>Project Name</Form.Label>

                            <Form.Control type="text" placeholder="Happy Foundation" onChange={(e) => setProjectName(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">

                            <Form.Label>Description</Form.Label>

                            <Form.Control type="text" placeholder="Bringing change one step at a time" onChange={(e) => setDesc(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">

                            <Form.Label>Motto</Form.Label>

                            <Form.Control type="text" placeholder="Change the world not the climate." onChange={(e) => setMotto(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="numberField">

                            <Form.Label>Number Of Volunteers Required</Form.Label>

                            <Form.Control type="number" placeholder="Volunteers" onChange={(e) => setNumVol(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">

                            <Form.Label>Place</Form.Label>

                            <Form.Control type="text" placeholder="Place" onChange={(e) => setPlace(e.target.value)} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">

                            <Form.Label>Image Url</Form.Label>

                            <Form.Control type="text" placeholder="Image" onChange={(e) => setImageurl(e.target.value)} />

                        </Form.Group>

                        <div className="uploading">

                            <Button onClick={handleSubmit} variant="primary" className="sub-btn" type="submit">

                                Submit

                            </Button>

                        </div>

                    </Form>

                </Modal.Body>

            </Modal>

        </div>

    );

};




export default ModalNgo;