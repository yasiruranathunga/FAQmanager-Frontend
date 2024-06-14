import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaqContext } from '../context/FaqContext';

const AddQuestionModal = ({ show, handleClose }) => {
  const { faqs, addFaq } = useContext(FaqContext);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Draft');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && category) {
      const newFaq = {
        question,
        category,
        status
      };
      addFaq(newFaq);
      handleClose();
      // Clear input fields for next question (optional)
      setQuestion('');
      setCategory('');
      setStatus('Draft');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus" className="mt-3">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddQuestionModal;
