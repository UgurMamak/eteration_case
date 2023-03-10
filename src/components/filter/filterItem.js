import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import uuid from 'react-uuid';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';

export default function FilterItem({
  eventKey,
  children,
  filter,
  selectedFilters,
  handleChange
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  let filteredData = filter.choices;

  if (filter.searchable) {
    const isSort = filter.filterName === 'sort'
    if (isSort) {

    } else {
      filteredData = filter.choices.filter((item) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }

  let renderFilterItemList = filteredData.map((item) => (
    <Form.Check
      key={uuid()}
      label={item.title}
      name={filter.filterName}
      type={filter.type === 'multiselect' ? 'checkbox' : 'radio'}
      id={item.value}
      value={item.value}
      onChange={(e) => filter.type === 'multiselect' ? handleChange(e, filter.filterName) : handleChange(e, filter.filterName)}
      checked={selectedFilters[filter.filterName] ? selectedFilters[filter.filterName].includes(item.value) : false}
    />));

  return (
    <Accordion.Item eventKey={filter.filterName}>
      <Accordion.Header>{filter.title}</Accordion.Header>
      <Accordion.Body>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {renderFilterItemList}
      </Accordion.Body>
    </Accordion.Item>
  )
}
