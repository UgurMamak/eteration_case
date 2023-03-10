import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Counter({count,handleClick}) {
  return (
    <div className='counter'>
      <Button onClick={()=>handleClick(-1)}>-</Button>{' '}
        <span>{count}</span>
      <Button onClick={()=>handleClick(+1)}>+</Button>{' '}
    </div>
  )
}
