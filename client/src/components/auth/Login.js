import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getPayload } from '../../environment/Auth'

const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormError('')
  }

  const setLocalToken = (token) => {
    window.localStorage.setItem('the-circle-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      setLocalToken(data.token)
      const payload = getPayload()
      const userId = payload.sub
      window.localStorage.setItem('the-circle-userId', userId)
      navigate('/')
    } catch (error) {
      setFormError(error.response.data.message)
    }
  }

  return (
    <div className='form-page'>
      <Container className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Login</h2>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control onChange={handleChange} type='email' name='email' placeholder='email' defaultValue={formData.email}></Form.Control>
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' name='password' placeholder='Password' defaultValue={formData.password} />
          </Form.Group>
          {formError && <Form.Text>{formError}</Form.Text>}
          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Login