import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';
import FilterItem from './filterItem';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import filterItem from './filterItem';
import uuid from 'react-uuid';

export default function Filter() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedFilters, filters } = useSelector(state => state.productReducer);

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
    let list = filters.map((filter, filterIndex) => {
      const isSort = filter.filterName === 'sort'
      let elementEvent = isSort ? radioFilterEvent : checkboxFilterEvent
      return (
        <FilterItem
          handleChange={elementEvent}
          filter={filter}
          selectedFilters={selectedFilters}
          key={uuid()}
        />
      )
    });

    return list;
  }

  return (
    <Accordion defaultActiveKey="0">
      {
        renderFilterList()
      }
    </Accordion>
  )
}
