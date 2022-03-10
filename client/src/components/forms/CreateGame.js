import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getLocalToken } from '../../environment/Auth'

const CreateGame = () => {

  const [ formData, setFormData ] = useState({
    name: '',
    game_image: '',
    stats: '',
    description: ''
  })

  const [ formErrors, setFormErrors ] = useState({
    name: '',
    game_image: '',
    stats: '',
    description: ''
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
      const { data } = await axios.post('/api/games/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${getLocalToken()}`
          }
        })
      navigate(`/games/${data.id}`)
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data.errors })
    }
  }

  return (
    <div className='form-page'>
      <Container className='form'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h2>Create a Game</h2>
          <hr />
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='name'>Name</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Name' name='name' defaultValue={formData.name} />
            {formErrors.name && <Form.Text>{formErrors.name}</Form.Text>}
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label htmlFor='game_image'>Game Image</Form.Label>
            <Form.Control onChange={handleChange} type='text' placeholder='Image Url' name='game_image' defaultValue={formData.game_image} />
            {formErrors.game_image && <Form.Text>{formErrors.game_image}</Form.Text>}
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

export default CreateGame