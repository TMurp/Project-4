import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
import { getPayload, getLocalToken } from '../environment/Auth'


const ShowCharacter = () => {

  const [ character, setCharacter ] = useState(null)
  const { id } = useParams()
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getSingleCharacter = async () => {
      try {
        const { data } = await axios.get(`/api/characters/${id}/`)
        console.log(data)
        setCharacter(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getSingleCharacter()
  }, [id])

  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    return character.owner.id === payload.sub
  }

  const deleteCharacter = async () => {
    try {
      await axios.delete(`/api/characters/${id}/`, {
        headers: {
          Authorization: `Bearer ${getLocalToken()}`
        }
      }
      )
    } catch (error) {
      console.log('delete error message', error.response.data.message)
    }
  }

  return (
    <>
      {character ?
        <div className='wrapper'>
          <div className='title'>
            <h2>{character.name}</h2>
            {userIsOwner() && <Link className='btn-dark btn' to={`/characters/${id}/edit`}>Edit</Link>}
            {userIsOwner() && <Link className='btn-dark btn' onClick={deleteCharacter} to={'/'}>Delete</Link>}
          </div>
          <div className='card-top'>
            <div className='image'>
            <img src={character.character_image} alt={character.name}/>
            </div>
            <div className='description'>
              <p>{character.description}</p>
            </div>
          </div>
          <div className='card-bottom'>
            <div className='stats'>
            <p>Created by: {character.owner.username}</p>
            <p>Stats: {character.stats}</p>
            <p>{character.members}</p>
            <p>{character.character}</p>
            </div>
            <div className='comments'>

            </div>
          </div>
        </div>
        :
        <>
          {/* <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2> */}
        </>
      }
    </>
  )
}

export default ShowCharacter