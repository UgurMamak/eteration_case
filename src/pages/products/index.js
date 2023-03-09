import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getFilterChoices, getFilteredProducts } from '../../redux/productSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../../components/product-card';
import Pagination from '../../components/pagination';
import { useNavigate,  useLocation } from 'react-router-dom';
import Filter from '../../components/filter';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.filteredProducts);
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = products.length;
  const itemPerPage = 12;

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page",pageNumber);
    navigate(`?${searchParams.toString()}`)
  }

  useEffect(() => {
    dispatch(getProducts()).then(()=>{
      dispatch(getFilterChoices())
      dispatch(getFilteredProducts());
    });
    
  }, []);

  if (products.length > 0) {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    //const currentProducts = [];

    return (
      <Container>
        <Row>
          <Col sm={2}>
            <Filter/>
          </Col>
          <Col sm={8}>
            <Container>
              <Row>
                {currentProducts.map((item) => (
                  <Col key={item.id} sm={3}>
                    <ProductCard data={item} />
                  </Col>
                ))}
              </Row>
              <Row>
                <Pagination currentPage={currentPage} totalCount={totalCount} itemPerPage={itemPerPage} onPageChange={onPageChange} />
              </Row>
            </Container>
          </Col>
          <Col sm={2}>sm=8</Col>
        </Row>

        {/* <Pagination currentPage={1} totalCount={totalCount} itemPerPage={itemPerPage} onPageChange={onPageChange} />
        <Pagination currentPage={22} totalCount={totalCount} itemPerPage={itemPerPage} onPageChange={onPageChange} />
        <Pagination currentPage={1} totalCount={30} itemPerPage={5} onPageChange={onPageChange} /> */}
      </Container>
    )
  }
  return (
    <div>Loading....</div>
  )
}