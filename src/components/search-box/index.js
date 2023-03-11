import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';


export default function SearchBox() {

  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector(state => state.productReducer);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      let tempSelectedFilters = { ...selectedFilters };

      tempSelectedFilters = {
        ...tempSelectedFilters,
        search: [text]
      };

      dispatch(updateSelectedFilters(tempSelectedFilters));
      dispatch(getFilteredProducts());

    }
  }


  return (
    <InputGroup className="header-search-wrapper">
      <InputGroup.Text id="basic-addon1">
        <i className="bi bi-search"></i>
      </InputGroup.Text>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>



  )
}
