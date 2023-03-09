import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';
import FilterItem from './filterItem';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import filterItem from './filterItem';

export default function Filter() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedFilters, filters } = useSelector(state => state.productReducer);

  const handleChange = (e) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('page');

    if (location.search) {
      navigate(`?${e.target.value}`);
      console.log("if", location);
    } else {
      navigate(`?${e.target.value}`);
      console.log("else", location);
    }


    //http://localhost:3000/?sortBy=createdAt&order=asc
    //http://localhost:3000/&sortBy=createdAt&order=desc
  }

  const checkboxFilterEvent = (e, filterName) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    console.log("filterName=", filterName);
    let tempSelectedFilters = { ...selectedFilters };

    if (!tempSelectedFilters.hasOwnProperty(filterName)) {
      tempSelectedFilters = {
        ...tempSelectedFilters,
        [filterName]: []
      }
    }

    if (isChecked) {
      tempSelectedFilters = {
        ...tempSelectedFilters,
        [filterName]: [...tempSelectedFilters[filterName], value]
      }
    } else {
      tempSelectedFilters = {
        ...tempSelectedFilters,
        [filterName]: tempSelectedFilters[filterName].filter((v) => v !== value)
      }
    }

    dispatch(updateSelectedFilters(tempSelectedFilters));
    dispatch(getFilteredProducts());
    
  }

  useEffect(() => {
    console.log("Did mount");
    const obj=getUrlParametre();
    if(Object.keys(obj).length > 0){
      dispatch(updateSelectedFilters(obj));
    }

  }, []);

  useEffect(()=>{
    setUrlParametre();
  },[selectedFilters]);

  const setUrlParametre = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('page');

    for (let key in selectedFilters) {
      searchParams.set(key, selectedFilters[key]);
    }

    navigate(`?${searchParams.toString()}`)
  }

  const getUrlParametre = ()=>{
    const params = new URLSearchParams(location.search);
    const obj = {};
    params.forEach(function (value, key) {
      obj[key] = value.split(',');
    });
    return obj;
  }

  return (
    <Accordion defaultActiveKey="0">
      <FilterItem eventKey="0" title="Sort By">
        <Form.Check
          label="Old to new"
          name="order"
          type="radio"
          id=""
          value="sortBy=createdAt&order=asc"
          onChange={(e) => handleChange(e)}
        />
        <Form.Check

          label="New to old"
          name="order"
          type="radio"
          id=""
          value="sortBy=createdAt&order=desc"
          onChange={(e) => handleChange(e)}

        />
        <Form.Check
          label="Price hight to low"
          name="order"
          type="radio"
          id="desc"
          value="sortBy=pricet&order=desc"
          onChange={(e) => handleChange(e)}
        />
        <Form.Check
          label="Price low to High"
          name="order"
          type="radio"
          id="asc"
          value="sortBy=pricet&order=asc"
          onChange={(e) => handleChange(e)}
        />
      </FilterItem>

      {
        filters.map((filter, filterIndex) => (
          <FilterItem key={filter.filterName} eventKey={filter.filterName} title={filter.title}>
            {
              filter.choices.map((item, index) => (
                <Form.Check
                  key={index}
                  label={item}
                  name={filter.filterName}
                  type="checkbox"
                  id={item}
                  value={item}
                  onChange={(e) => checkboxFilterEvent(e, filter.filterName)}
                  checked={selectedFilters[filter.filterName] ? selectedFilters[filter.filterName].includes(item) : false}
                />
              ))
            }
          </FilterItem>
        ))
      }
    </Accordion>
  )
}
