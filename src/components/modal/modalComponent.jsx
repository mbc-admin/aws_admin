// Modal.js
import React from "react";
import "./modal.css";
import Button from "../button/button.component";

const Modal = ({ showModal, closeModal, title, description }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <p className="modal-description">{description}</p>
          <Button
            text={'Aceptar'}
            primary
            press={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;