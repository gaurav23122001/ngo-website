import { useState } from "react";
import {
  Modal,
  Button,
  Col,
  Row,
  Container,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./ngoModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faMobile,
  faPerson,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const ProjectDisplay = ({show,setShow,project}) => {
  

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        fullscreen="xxl-down"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Project Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div class="text-center"> */}
          {/* <img
              src="https://www.shutterstock.com/image-photo/diversity-group-volunteer-people-joining-260nw-2306775045.jpg"
              class="img-fluid"
              alt="img"
            /> */}

          {/* </div> */}

          <Container style={{ margin: "2% 2% 0 2%" }}>
            <img
              src={project.projectImage}
              class="rounded mx-auto d-block"
              alt="..."
              style={{ margin: "0 0 5% 0" }}
            ></img>
            <Row>
              <Col xs={9}>
                <Row>
                  <h2>{project.projectName}</h2>
                </Row>
                
              </Col>
              <Col style={{ textAlign: "center", opacity: "65%" }}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ marginRight: "2%" }}
                />
                {project.place}
              </Col>
            </Row>
            <div class="panel-body" style={{ marginTop: "5%" }}>
              <div class="col-sm-12">
                <h4>Project Description</h4>
                <p>
                  {project.description}
                </p>
              </div>
            </div>
            <hr />
            <div class="panel-body">
              <div class="col-sm-12">
                <h4>Motto</h4>
                <p>
                  {project.motto}
                </p>
              </div>
            </div>
            <div
              style={{ margin: "3% 0 5% 0%", fontSize: "110%", opacity: "75%" }}
            >
              <FontAwesomeIcon icon={faPerson} style={{ marginRight: "1%" }} />
              Number of Openings: {project.numOfOpenings}
            </div>

            {/* <div class="card" style={{width: '50%'}}>
  <img src="https://www.shutterstock.com/image-photo/diversity-group-volunteer-people-joining-260nw-2306775045.jpg" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">NGO Name</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <></>
  </div>
</div> */}

            {/* <hr />
            <div class="card" style={{ width: "100%", marginTop: "5%" }}>
              <img
                class="card-img-top"
                src="https://www.shutterstock.com/image-photo/diversity-group-volunteer-people-joining-260nw-2306775045.jpg"
                alt="Card image cap"
              />
              <div class="card-body">
                <h5 class="card-title">NGO Name</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. NGO Description
                </p>
                <div style={{ opacity: "80%", marginBottom: "2%" }}>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={{ marginRight: "1%" }}
                  />
                  Rating: ngoRating
                </div>

                <h6 style={{ marginTop: "3%" }}>Address</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content. NGO ADDRESS
                </p>

                
              </div>
            </div> */}
          </Container>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default ProjectDisplay;
