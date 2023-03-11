import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilteredProducts, updateSelectedFilters } from '../../redux/productSlice';
import FilterItem from './filterItem';
import { useNavigate, useLocation } from 'react-router-dom';
import uuid from 'react-uuid';
import Button from 'react-bootstrap/Button';
import useUrlParametre from '../../hooks/useUrlParametre';

export default function Filter({ show, showEvent }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedFilters, filters } = useSelector(state => state.productReducer);
  const [selectedChoices, setSelectedChoices] = useState(selectedFilters);
  const getUrlParamObject = useUrlParametre();

  const checkboxFilterEvent = (e, filterName) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    let tempSelectedFilters = { ...selectedChoices };

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
    setSelectedChoices(tempSelectedFilters);

    if (window.innerWidth > 991) {
      dispatch(getFilteredProducts());
    }
  }

  const mobileFilterAction = () => {
    dispatch(getFilteredProducts());
    showEvent(false);
  }

  const radioFilterEvent = (e, filterName) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    let tempSelectedFilters = { ...selectedChoices };

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

    if (window.innerWidth > 991) {
      dispatch(getFilteredProducts());
    }
  }

  useEffect(() => {
    const obj = getUrlParamObject;
    if (Object.keys(obj).length > 0) {
      dispatch(updateSelectedFilters(obj));
      dispatch(getFilteredProducts());
    }
  }, []);

  useEffect(() => {
    setUrlParametre();
    setSelectedChoices(selectedFilters);
  }, [selectedFilters]);

  const setUrlParametre = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('page');

    for (let key in selectedFilters) {
      if (selectedFilters[key].length === 0) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, selectedFilters[key]);
      }
    }

    navigate(`?${searchParams.toString()}`)
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
    <div className={`filter ${show ? 'filter-open' : ''}`}>
      <Button className='d-lg-none' onClick={()=>showEvent(false)} variant="link"><i className="bi bi-x-lg"></i></Button>
      {
        renderFilterList()
      }
      <Button onClick={mobileFilterAction} className='w-100 d-lg-none' variant="primary">Filtrele</Button>{' '}
    </div>
  )
}
