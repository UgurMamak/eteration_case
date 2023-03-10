import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Counter({count,handleClick}) {
  return (
    <div>
      <Button onClick={()=>handleClick(-1)}>-</Button>{' '}
        {count}
      <Button onClick={()=>handleClick(+1)}>+</Button>{' '}
    </div>
  )
}
