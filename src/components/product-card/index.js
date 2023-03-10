import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { setBasket } from '../../redux/basketSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ProductCard({ data }) {
  const dispatch = useDispatch();

  const addToCart = (e,data) => {
    e.stopPropagation();
    e.preventDefault();
    const count = 1;
    dispatch(setBasket({product:data, count:count}));
  }

  return (
    <Link to={`/product/${data.id}`}>
    <Card>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <div className="price-container">
          <span>{data.price}</span>
        </div>
        <div className="price-container">
          <span>Model--{data.model}</span>
        </div>
        <div className="price-container">
          <span>Brand--{data.brand}</span>
        </div>
        <Card.Title>{data.name}</Card.Title>
        <Button onClick={(e) => addToCart(e,data)} variant="primary">Add To Cart</Button>
      </Card.Body>
    </Card>
    </Link>
  )
}
