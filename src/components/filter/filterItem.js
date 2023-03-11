import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import uuid from 'react-uuid';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';



export default function FilterItem({
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
      className='filter__element'
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
    <div className='filter__item'>
      <span className='filter__title'>{filter.title}</span>
      <Card className='filter__card'>
        {
          filter.searchable &&
          <InputGroup className="search-wrapper">
          <InputGroup.Text id="basic-addon1">
          <i className="bi bi-search"></i>
          </InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
        }
        <Card.Body>
          {renderFilterItemList}
        </Card.Body>
      </Card>
    </div>
  )
}
