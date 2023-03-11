import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getFilterChoices, getFilteredProducts } from '../../redux/productSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../../components/product-card';
import Pagination from '../../components/pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import Filter from '../../components/filter';
import Spinner from 'react-bootstrap/Spinner';
import MiniBasket from '../../components/mini-basket';
import Button from 'react-bootstrap/Button';


export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.filteredProducts);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = products.length;
  const itemPerPage = 12;

  const [filterIsShow, setFİlterIsShow] = useState(false);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`)
  }

  useEffect(() => {
    dispatch(getProducts()).then(() => {
      dispatch(getFilterChoices())
      dispatch(getFilteredProducts());
    });

  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);


  const filterMobileShowEvent = (isShow)=>{
    console.log("EVENT RUNN");
    setFİlterIsShow(isShow);
  }

  if (products.length > 0) {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return (
      <Container>
        <Row>
          <Col lg={2}>
          <Button onClick={()=>filterMobileShowEvent(true)} variant="link">Filtrele</Button>
          <Filter show={filterIsShow} showEvent={filterMobileShowEvent} />
          </Col>
          <Col lg={8}>
            <Container>
              <Row>
                {currentProducts.map((item) => (
                  <Col className='d-flex flex-column' key={item.id} xs={6} md={4} xl={3}>
                    <ProductCard data={item} />
                  </Col>
                ))}
              </Row>
              <Row className='d-flex'>
                <Pagination currentPage={currentPage} totalCount={totalCount} itemPerPage={itemPerPage} onPageChange={onPageChange} />
              </Row>
            </Container>
          </Col>
          <Col lg={2}>
            <MiniBasket/>
          </Col>
        </Row>
      </Container>
    )
  }
  return (
    <Spinner animation="border" />
  )
}