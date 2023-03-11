import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProductCard from '../../components/product-card';
import Pagination from '../../components/pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


export default function List({ products }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = products.length;
  const itemPerPage = 12;

  const onPageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(totalCount / itemPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`)
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);


  if (products.length > 0) {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentProducts = products.slice(startIndex, endIndex);
    return (
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
    )
  }

  return (
    <Container>
      <Spinner animation="border" />
    </Container>
  )
}
