import React from 'react'
import { Button,Card } from 'react-bootstrap'

export default function SideBar({ inbox }) {
  return (
    <div className="mt-4" style={{ height:'80vh'}}>
      <div className="d-grid gap-2">
  <Button variant="primary" size="md">
    Compose
  </Button>
   
      <div>
      Inbox ({inbox.length})
    </div>
    <div>
      Sent (0)
    </div>
    <div>
      Thrash (0)
    </div>
  
</div>
    </div>
  )
}
