// src/components/Pagination.js
import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ totalFaqs, faqsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalFaqs / faqsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination>
      <BootstrapPagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map(number => (
        <BootstrapPagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </BootstrapPagination.Item>
      ))}
      <BootstrapPagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
