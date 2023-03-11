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
import usePrice from '../../hooks/usePrice';
import Spinner from 'react-bootstrap/Spinner';

export default function ProductDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector(state => state.productReducer);
  const price = usePrice({ price: parseFloat(product.price) });


  const addToCart = (data) => {
    const count = 1;
    dispatch(setBasket({ product: data, count: count }));
  }

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);


  if(Object.keys(product).length>0){
    return (
      <Container>
        <Row>
          <Col lg={8}>
            <Card className='product'>
              <Row>
                <Col xs={12} lg={6}>
                  <Card.Img className='product__image' src={product.image} />
                </Col>
                <Col xs={12} lg={6}>
                  <Card.Body>
                    <Card.Title className='product__name'>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 product__price">{price}</Card.Subtitle>
                    <Button className='w-100 mt-5' onClick={() => addToCart(product)} variant="primary">Add To Cart</Button>
  
                    <Card.Text className='product__desc'>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={4}>
            <MiniBasket />
          </Col>
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
