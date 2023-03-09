import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

export default function filterItem({
  eventKey,
  children,
  title,
}) {
  return (
    <Accordion.Item eventKey={eventKey}>
    <Accordion.Header>{title}</Accordion.Header>
    <Accordion.Body>
      {children}
    </Accordion.Body>
  </Accordion.Item>
  )
}
