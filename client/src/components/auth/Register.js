import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Register = () => {

  const [ formData, setFormData ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: ''
  })

  const [ formErrors, setFormErrors ] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      await axios.post('/api/auth/register/', formData)
      navigate('/login/')
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div className='form-page'>
      <Container className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Register to The Circle</h2>
          <hr />
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='email'>Email Address</Form.Label>
            <Form.Control onChange={handleChange} type='email' placeholder='Email' name='email' defaultValue={formData.email} />
            {formErrors.email && <Form.Text>{formErrors.email}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='username'>Username</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Username' name='username' defaultValue={formData.username} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password'>Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' placeholder='Password' name='password' defaultValue={formData.password} />
            {formErrors.password && <Form.Text>{formErrors.password}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='password_confirmation'>Confirm Password</Form.Label>
            <Form.Control onChange={handleChange} type='password' placeholder='Confirm Password' name='password_confirmation' defaultValue={formData.password_confirmation} />
            {formErrors.password_confirmation && <Form.Text>{formErrors.password_confirmation}</Form.Text>}
          </Form.Group>
          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default Register
