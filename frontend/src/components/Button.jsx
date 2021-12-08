import React from 'react'
import { Button } from 'react-bootstrap';


export default function Button({ color, clicked, text }) {
  return (
     <Button variant={color} onClick={clicked}>{text}</Button>
  )
}
