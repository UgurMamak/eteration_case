import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setBasket } from '../../redux/basketSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import usePrice from '../../hooks/usePrice';

export default function ProductCard({ data }) {
  const dispatch = useDispatch();
  const price = usePrice({price:parseFloat(data.price),currency:'TRY',region:'tr-TR'});

  const addToCart = (e,data) => {
    e.stopPropagation();
    e.preventDefault();
    const count = 1;
    dispatch(setBasket({product:data, count:count}));
  }

  return (
    <Link className='product-link' to={`/product/${data.id}`}>
    <Card className='product-card mb-3'>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <div className="price-container mb-2">
          <span className="price">{price}</span>
        </div>
        <Card.Subtitle className="product-name mb-2">{data.name}</Card.Subtitle>
        <Button className='basket-btn' onClick={(e) => addToCart(e,data)} variant="primary">Add To Cart</Button>
      </Card.Body>
    </Card>
    </Link>
  )
}
