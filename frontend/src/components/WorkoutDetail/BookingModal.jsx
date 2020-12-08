import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function BookingModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Choose your class
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Monday 22/12/2020 at 11:30-12-45</Modal.Body>
        <Modal.Body>Wednesday 24/12/2020 at 11:30-12-45</Modal.Body>
        <Modal.Body>Monday 29/12/2020 at 11:30-12-45</Modal.Body>
        <Modal.Body>Wednesday 31/12/2020 at 11:30-12-45</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Confirm your booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingModal;
