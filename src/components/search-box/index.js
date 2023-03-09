import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function SearchBox() {

  const [text,setText] = useState('');
  const dispatch = useDispatch();
  const { selectedFilters } = useSelector(state => state.productReducer);

  const  handleKeyDown = (event) =>{
    if (event.keyCode === 13) {
      let tempSelectedFilters = { ...selectedFilters };

      tempSelectedFilters = {
        ...tempSelectedFilters,
        search: text
      };

      console.log('Enter key pressed!',text);
      dispatch(updateSelectedFilters(tempSelectedFilters));
      
      // Do something else here, such as submitting the form
    }
  }


  return (
 
    <Form.Control
      type="search"
      placeholder="Search"
      className="me-2"
      aria-label="Search"
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
    />


  )
}
