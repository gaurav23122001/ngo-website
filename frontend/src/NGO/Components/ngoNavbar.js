import React, { useState } from 'react';
import '../Pages/ngoDashboard.css';
import './ngoNavbar.css';
import ModalMain from './addProjectModal';

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <header className="navbar">
      <div className="navbar__title navbar__item">NGO</div>
      {/* <div className="navbar__title navbar__itme">
        <img src="" alt = "Ngo Logo"></img>
      </div> */}
      <button className="navbar__item" onClick={handleModal}>
        Add Project
      </button>
      {showModal && <ModalMain closeModal={handleCloseModal} />}
    </header>
  );
}

export default Navbar;
