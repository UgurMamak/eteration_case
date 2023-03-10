import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getProductById } from '../../redux/productSlice';
import { setBasket } from '../../redux/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MiniBasket from '../../components/mini-basket';


export default function ProductDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.productReducer);

  const addToCart = (data) => {
    const count = 1;
    dispatch(setBasket({ product: data, count: count }));
  }

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{product.price}</Card.Subtitle>
              <Card.Text>
                {product.description}
              </Card.Text>
              <Button onClick={() => addToCart(product)} variant="primary">Add To Cart</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
        <MiniBasket/>
        </Col>
      </Row>

    </Container>
  )
}
