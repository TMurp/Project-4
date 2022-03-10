import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getLocalToken } from '../../environment/Auth'

const EditCharacter = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [ formData, setFormData ] = useState({
    name: '',
    stats: '',
    description: '',
    character_image: '',
    owner: {
      username: '',
      profile_image: '',
      stats: '',
      description: '',
      password: '',
      password_confirmation: ''
    }
  })

  const [ formErrors, setFormErrors ] = useState({
    name: '',
    stats: '',
    description: '',
    character_image: '',
    owner: {
      username: '',
      profile_image: '',
      stats: '',
      description: '',
      password: '',
      password_confirmation: ''
    }
  })

  useEffect(() => {
    const getData = async () => {
      try {
        // console.log(id)
        const { data } = await axios.get(`/api/characters/${id}/`)
        console.log('Get request data', data)
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
      const { data } = await axios.put(`/api/characters/${id}/`, 
        formData,
        {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
        })
      console.log('data ->', data)
      navigate(`/characters/${id}/`)
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div className='form-page'>
      <Container className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Edit Character</h2>
          <hr />
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name'>Character Name</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Character Name' name='name' defaultValue={formData.name} />
            {formErrors.name && <Form.Text>{formErrors.name}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='character_image'>Character Image</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Image Url' name='character_image' defaultValue={formData.character_image} />
            {formErrors.character_image && <Form.Text>{formErrors.character_image}</Form.Text>}
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
          <Form.Group className='text-center mt-4'>
            <Button type='submit' className='btn btn-dark'>Submit</ Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  )
}

export default EditCharacter