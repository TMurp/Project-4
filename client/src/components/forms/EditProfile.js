import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getLocalToken } from '../../environment/Auth'

const EditProfile = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [ formData, setFormData ] = useState({
    // email: '',
    username: '',
    profile_image: '',
    stats: '',
    description: '',
    password: '',
    password_confirmation: ''
  })

  const [ formErrors, setFormErrors ] = useState({
    // email: '',
    username: '',
    profile_image: '',
    stats: '',
    description: '',
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    const getData = async () => {
      try {
        console.log(id)
        const { data } = await axios.get(`/api/users/${id}/`)
        console.log(data)
        setFormData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [id])

  const handleChange = (e) => {
    const newObj = { ...formData, [e.target.name]: e.target.value }
    setFormData(newObj)
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const { data } = await axios.put(`/api/users/${id}/`, 
        formData,
        {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
        })
      console.log('data ->', data)
      navigate(`/users/${id}/`)
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div className='form-page'>
      <Container className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Edit Profile</h2>
          <hr />
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name'>Username</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Username' name='username' defaultValue={formData.username} />
            {formErrors.username && <Form.Text>{formErrors.username}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='profile_image'>Profile Image</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Image Url' name='profile_image' defaultValue={formData.profile_image} />
            {formErrors.profile_image && <Form.Text>{formErrors.profile_image}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='stats'>Stats</Form.Label>
            <Form.Control onChange={handleChange} as="textarea" type='text' placeholder='Stats' name='stats' defaultValue={formData.stats} />
            {formErrors.stats && <Form.Text>{formErrors.stats}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='description'>Description</Form.Label>
            <Form.Control onChange={handleChange} as="textarea" type='text' placeholder='Description' name='description' defaultValue={formData.description} />
            {formErrors.description && <Form.Text>{formErrors.description}</Form.Text>}
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

export default EditProfile