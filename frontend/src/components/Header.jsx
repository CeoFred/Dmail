import React from 'react'
import {Navbar,Container,Nav,Button} from 'react-bootstrap'

export default function Header({ address , connectwallet, logout }) {

  const [state, setState] = React.useState({address:null})

React.useEffect(()=>{
  setState({address})
},[address])

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">Dmail</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    
    </Nav>
    <Nav>
      {!address && <Button onClick={connectwallet}>Connect Wallet</Button>}
      <Nav.Link eventKey={2} href="#memes">
        {state.address && state.address}
      </Nav.Link>
      
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
