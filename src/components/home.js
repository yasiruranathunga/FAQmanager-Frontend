import React, { useState } from 'react';
import { FaqProvider } from '../context/FaqContext';
import FaqList from './FaqList';
import SearchBar from './SearchBar';
import AddQuestionModal from './AddQuestionModal';
import { Button } from 'react-bootstrap';
import '../../src/App.css';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <FaqProvider>
      <div className="container mt-5">
        <h1>FAQ Manager - iLabs</h1>

        <div className="d-flex justify-content-between my-3">
          <SearchBar />
          <Button variant="primary" onClick={() => setShowModal(true)}>Add New Question</Button>
        </div>


        <FaqList />
        <AddQuestionModal show={showModal} handleClose={() => setShowModal(false)} />
        <footer className="mt-5">
          <p>© iLabs, All Rights Reserved</p>
          <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Help Center</a></p>
        </footer>
      </div>
    </FaqProvider>
  );
};

export default Home;