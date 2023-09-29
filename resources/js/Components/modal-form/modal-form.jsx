import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import RenderCards from '../render-cards/render-cards';

function TodoModal({ show, handleClose, method, url, updateCard }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '', 
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios[method](url, formData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    })
    .then((response) => {
      handleClose();
      renderNewCard();
      if (updateCard) {
        location.reload()
      }
    })
    .catch((error) => {
      console.error('Error al enviar el formulario:', error);
    });
  };
  function renderNewCard() {
    <RenderCards newCard={true}></RenderCards>
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>To-do title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="my To-do"
                autoFocus
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>To-do description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="To-do Description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TodoModal;