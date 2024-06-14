import React, { useState, useContext } from 'react';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaqContext } from '../context/FaqContext';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'; // Import icons from react-icons

const FaqTable = ({ faqs }) => {
  const { deleteFaq, deactivateFaq, publishFaq } = useContext(FaqContext);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' }); // Default sort by 'id' ascending

  const sortedFaqs = [...faqs].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? <BsArrowUp /> : <BsArrowDown />;
    }
    return null;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th onClick={() => requestSort('id')}>
            #
            {getSortIcon('id')}
          </th>
          <th onClick={() => requestSort('question')}>
            Question
            {getSortIcon('question')}
          </th>
          <th onClick={() => requestSort('category')}>
            Category
            {getSortIcon('category')}
          </th>
          <th onClick={() => requestSort('status')}>
            Status
            {getSortIcon('status')}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedFaqs.map((faq) => (
          <tr key={faq.id}>
            <td>{faq.id}</td>
            <td>{faq.question}</td>
            <td>{faq.category}</td>
            <td>{faq.status === 'Published' ? <span className="badge bg-success">Published</span> : <span className="badge bg-secondary">Draft</span>}</td>
            <td>
              <DropdownButton id="dropdown-basic-button" title="...">
                <Dropdown.Item onClick={() => publishFaq(faq.id)}>Publish</Dropdown.Item>
                <Dropdown.Item onClick={() => deactivateFaq(faq.id)}>Deactivate</Dropdown.Item>
                <Dropdown.Item onClick={() => deleteFaq(faq.id)}>Delete</Dropdown.Item>
              </DropdownButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default FaqTable;
