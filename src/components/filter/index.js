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
      };

    }
    dispatch(updateSelectedFilters(tempSelectedFilters));
    dispatch(getFilteredProducts());

  }

  const radioFilterEvent = (e, filterName) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
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
        [filterName]: [value]
      }
    }

    dispatch(updateSelectedFilters(tempSelectedFilters));
    dispatch(getFilteredProducts());

  }

  useEffect(() => {
    console.log("Did mount");
    const obj = getUrlParametre();
    if (Object.keys(obj).length > 0) {
      dispatch(updateSelectedFilters(obj));
      dispatch(getFilteredProducts());
    }

  }, []);

  useEffect(() => {
    setUrlParametre();
  }, [selectedFilters]);

  const setUrlParametre = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('page');

    for (let key in selectedFilters) {
      console.log("for loop=", selectedFilters[key]);
      if (selectedFilters[key].length === 0) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, selectedFilters[key]);
      }
    }

    navigate(`?${searchParams.toString()}`)
  }

  const getUrlParametre = () => {
    const params = new URLSearchParams(location.search);
    const obj = {};
    params.forEach(function (value, key) {
      obj[key] = value.split(',');
    });
    return obj;
  }


  const renderFilterList = () => {
    let list = filters.map((filter, filterIndex) => (
      <FilterItem key={filter.filterName} eventKey={filter.filterName} title={filter.title}>
        {renderFilterITem(filter)}
      </FilterItem>
    ));

    return list;
  }

  const renderFilterITem = (filter) => {
    const isSort = filter.filterName === 'sort'

    let list = filter.choices.map((item, index) => {

      if (isSort) {
        return (
          <Form.Check
            key={index}
            label={item.title}
            name={filter.filterName}
            type={filter.type === 'multiselect' ? 'checkbox' : 'radio'}
            id={item.value}
            value={item.value}
            onChange={(e) => filter.type === 'multiselect' ? checkboxFilterEvent(e, filter.filterName) : radioFilterEvent(e, filter.filterName)}
            checked={selectedFilters[filter.filterName] ? selectedFilters[filter.filterName].includes(item.value) : false}
          />
        )
      } else {
        return (
          <Form.Check
            key={index}
            label={item}
            name={filter.filterName}
            type={filter.type === 'multiselect' ? 'checkbox' : 'radio'}
            id={item}
            value={item}
            onChange={(e) => filter.type === 'multiselect' ? checkboxFilterEvent(e, filter.filterName) : radioFilterEvent(e, filter.filterName)}
            checked={selectedFilters[filter.filterName] ? selectedFilters[filter.filterName].includes(item) : false}
          />
        )
      }
    });

    return list;
  }

  const renderFilterITem2 = (filter) => {
    const isSort = filter.filterName === 'sort'

    filter.choices.map((item, index) => (
      <Form.Check
        key={index}
        label={item}
        name={filter.filterName}
        type={filter.type === 'multiselect' ? 'checkbox' : 'radio'}
        id={item}
        value={item}
        onChange={(e) => filter.type === 'multiselect' ? checkboxFilterEvent(e, filter.filterName) : radioFilterEvent(e, filter.filterName)}
        checked={selectedFilters[filter.filterName] ? selectedFilters[filter.filterName].includes(item) : false}
      />
    ))
  }

  return (
    <Accordion defaultActiveKey="0">
      {
        renderFilterList()
      }
    </Accordion>
  )
}
