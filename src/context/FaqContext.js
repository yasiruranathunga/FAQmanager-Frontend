import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FaqContext = createContext();

export const FaqProvider = ({ children }) => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/qestions');
        setFaqs(response.data);
        setFilteredFaqs(response.data);
      } catch (error) {
        console.error('Error fetching the FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  const addFaq = async (faq) => {
    try {
      const response = await axios.post('http://localhost:8080/qestion', faq);
      const newFaq = response.data;
      const newFaqs = [...faqs, newFaq];
      setFaqs(newFaqs);
      setFilteredFaqs(newFaqs);
    } catch (error) {
      console.error('Error adding the FAQ:', error);
    }
  };

  const deleteFaq = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/qestion/${id}`);
      const newFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(newFaqs);
      setFilteredFaqs(newFaqs);
    } catch (error) {
      console.error('Error deleting the FAQ:', error);
    }
  };

  const updateFaqStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/qestion/${id}`, { status });
      const newFaqs = faqs.map((faq) =>
        faq.id === id ? { ...faq, status } : faq
      );
      setFaqs(newFaqs);
      setFilteredFaqs(newFaqs);
    } catch (error) {
      console.error(`Error updating the FAQ status to ${status}:`, error);
    }
  };

  const publishFaq = (id) => {
    updateFaqStatus(id, 'Published');
  };

  const deactivateFaq = (id) => {
    updateFaqStatus(id, 'Draft');
  };

  return (
    <FaqContext.Provider value={{ faqs, filteredFaqs, addFaq, deleteFaq, deactivateFaq, setFilteredFaqs, publishFaq }}>
      {children}
    </FaqContext.Provider>
  );
};
