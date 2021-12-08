import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Inbox from './Inbox'
import SideBar from '../../components/SideBar'
import { Row, Col, Container} from 'react-bootstrap'
import Compose from './Compose'


export default function Dmail({ address,contract }) {

  const [showCompose, setShowCompose] = useState(false)
  const  [inbox, setInbox] = useState([])

  useEffect(() => {
    if(contract){
      fetchInbox()
    }
  }, [contract])

  async function fetchInbox(){
    const tx = await contract.getInbox();
 
    console.log(tx[0])
    let inbox = [];
        tx.forEach(inb => {
          inbox.push({
            sender: inb.sender,
            timestamp: new Date(inb.timestamp * 1000),
            message: inb.message,
            subject: inb.subject
          });
        });
        setInbox(inbox);
  }

  return (
    <div>
      <Header address={address} />
      <Container fluid>
        <Row>
          <Col md={3}>
        <SideBar inbox={inbox} />
          </Col>
          <Col md={9}>
        <Inbox inbox={inbox} address={address} showCompose={setShowCompose} contract={contract} />
          </Col>
        </Row>
      </Container>
      <div className="mail_compose">
        <Compose showCompose={showCompose} setShowCompose={setShowCompose} contract={contract}  />
        </div>
    </div>
  )
}
