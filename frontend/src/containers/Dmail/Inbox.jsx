import React, { useState, useEffect } from 'react'
import { ListGroup} from 'react-bootstrap'
export default function Inbox({ inbox }) {


  return (
    <div className="mt-4 bg-dark text-white p-2" style={{height:'80vh'}}>
      <ListGroup>
      {Array.isArray(inbox) && inbox.map((item, index) => {
        return (
          <ListGroup.Item key={index}>
         <b>{item.sender.substring(0, 15) + "..."}</b>   <b>{item.subject}</b> <span>{item.message}</span> <small>{item.timestamp.toLocaleString()}</small>
           </ListGroup.Item>
        )
      })}
      </ListGroup>
      {Array.isArray(inbox) && inbox.length === 0 && <div>No messages yet!</div>}
    </div>
  )
}
