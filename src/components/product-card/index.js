import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ProductCard({data}) {
  return (
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
      <Button variant="primary">Add To Cart</Button>
    </Card.Body>
  </Card>
  )
}
