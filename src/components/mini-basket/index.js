import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { setBasket } from '../../redux/basketSlice';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../counter';
import Button from 'react-bootstrap/Button';
import Price from './price';

export default function Index() {
  const dispatch = useDispatch();
  const { basket } = useSelector((state) => state.basketReducer);


  const cartAction = (product, count) => {
    console.log("COUNT DEĞERI", count, product);

    dispatch(setBasket({ product: product, count: count }));

  }

  const renderBasketItem = () => {
    const list = basket.basketItem.map((item, index) => (
      <ListGroup.Item className='d-flex' key={item.product.id}>
        <div className='item d-flex flex-column'>
          <span className='product-name'>{item.product.name}</span>
          <span className='product-price'><Price price={parseFloat(item.product.price)} currency='TRY' region='tr-TR' /></span>
        </div>
        <div className='item'>
          <Counter count={item.quantity} handleClick={(count) => { cartAction(item.product, count) }} />
        </div>
      </ListGroup.Item>
    ));
    return list;
  }

  const renderTotalPrice = () => {
    return (
      <Card className='mini-basket__card'>
        <Card.Body>
          <Card.Title>
            <span>Total Price</span>
            <span>
              <Price price={basket.basketTotalPrice} currency='TRY' region='tr-TR' />
            </span>
          </Card.Title>
          <Button href="#">Checkout</Button>{' '}
        </Card.Body>
      </Card>
    )
  }

  if (basket.basketItem.length > 0) {
    return (
      <div className='mini-basket'>
        <div className='mini-basket__title'>Cart</div>
        <Card className='mini-basket__card'>
          <ListGroup variant="flush">
            {renderBasketItem()}
          </ListGroup>
        </Card>
        <div className='mini-basket__title--type2'>Cart</div>
        {renderTotalPrice()}
      </div>
    )
  }

  return <>Loading</>


}
