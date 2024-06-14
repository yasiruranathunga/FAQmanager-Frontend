// src/components/SearchBar.js
import React, { useContext, useState, useEffect } from 'react';
import { FaqContext } from '../context/FaqContext';
import { FormControl, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
  const { faqs, setFilteredFaqs } = useContext(FaqContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      const filtered = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchTerm, faqs, setFilteredFaqs]);

  return (
    <InputGroup className="w-50">
      <FormControl
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
