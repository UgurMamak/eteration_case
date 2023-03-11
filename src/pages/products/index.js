import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getFilterChoices, getFilteredProducts } from '../../redux/productSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../../components/filter';
import MiniBasket from '../../components/mini-basket';
import Button from 'react-bootstrap/Button';
import List from './list';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.filteredProducts);
  const [filterIsShow, setFİlterIsShow] = useState(false);

  useEffect(() => {
    dispatch(getProducts()).then(() => {
      dispatch(getFilterChoices())
      dispatch(getFilteredProducts());
    });
  }, []);

  const filterMobileShowEvent = (isShow) => {
    setFİlterIsShow(isShow);
  }

  return (
    <Container>
      <Row>
        <Col lg={2}>
          <Button className='d-lg-none' onClick={() => filterMobileShowEvent(true)} variant="link">Filtrele</Button>
          <Filter show={filterIsShow} showEvent={filterMobileShowEvent} />
        </Col>
        <Col lg={8}>
          <List products={products} />
        </Col>
        <Col lg={2}>
          <MiniBasket />
        </Col>
      </Row>
    </Container>
  )
}