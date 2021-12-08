import React, { useState } from 'react'
import { Form , Button, Spinner,Alert } from 'react-bootstrap'
import {Loading} from '../../components/Loading'
import {ethers} from 'ethers'


export default function Compose({ contract }) {


    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

  async function handleMessageSend(e){
    e.preventDefault()

    setError('')
    setSuccess(false)

    await setLoading(true)
    if(!ethers.utils.isAddress(address)){
      setError('Invalid address')
      await setLoading(false)
      return;
    }

    try {
      let tx = await contract.sendMessage(address, subject, message)
    await tx.wait();  // wait for the transaction to be mined
    console.log('message sent')
      setMessage('')
      setSuccess(true)
      setSubject('')
    } catch (error) {
      console.log(error)
      setError(error)
    } finally {
      await setLoading(false)
    }
  }
  return (
    <div>
      <Form>
  {success && <Alert variant={"success"}>
    Email Sent Successfully
  </Alert>}
   {error && <Alert variant={"danger"}>
    {error}
  </Alert>}
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Subject</Form.Label>
    <Form.Control value={subject} onChange={(e) => setSubject(e.target.value) } type="text" placeholder="" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Address</Form.Label>
    <Form.Control value={address} onChange={(e) => setAddress(e.target.value) }  type="text" placeholder="0x0" />
  </Form.Group>

  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Message</Form.Label>
    <Form.Control value={message} onChange={(e) => setMessage(e.target.value) } as="textarea" rows={3} />
  </Form.Group>

  <Button disabled={loading} variant="primary" type="button" onClick={handleMessageSend}>
    {loading ? <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    /> : 'Send'}
  </Button>
</Form>
    </div>
  )
}
