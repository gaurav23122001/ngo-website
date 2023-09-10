import React, { useState } from 'react';
import '../Pages/volDashboard.css';
import './volNavbar.css';
// import ModalMain from './ngoModal';

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
      <div className="navbar__title navbar__item">Arms Of Hope</div>
      {/* <div className="navbar__title navbar__itme">
        <img src="" alt = "Ngo Logo"></img>
      </div> */}
      {/* <button className="navbar__item" onClick={handleModal}>
        Add Project
      </button>
      {showModal && <ModalMain closeModal={handleCloseModal} />} */}
    </header>
  );
}

export default Navbar;
