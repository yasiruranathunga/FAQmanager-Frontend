// src/components/FaqList.js
import React, { useContext, useState } from 'react';
import { FaqContext } from '../context/FaqContext';
import FaqTable from './FaqTable';
import Pagination from './Pagination';

const FaqList = () => {
  const { filteredFaqs } = useContext(FaqContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [faqsPerPage] = useState(5);

  // Get current FAQs
  const indexOfLastFaq = currentPage * faqsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - faqsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstFaq, indexOfLastFaq);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <FaqTable faqs={currentFaqs} />
      <Pagination
        totalFaqs={filteredFaqs.length}
        faqsPerPage={faqsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default FaqList;
