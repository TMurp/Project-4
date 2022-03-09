import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './utilities/Spinner'

const ShowCharacter = () => {

  const [ character, setCharacter ] = useState(null)
  const { id } = useParams()
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getSingleCharacter = async () => {
      try {
        const { data } = await axios.get(`/api/characters/${id}/`)
        setCharacter(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleCharacter()
  }, [id])

  return (
    <>
      {character ?
        <div className='character-wrapper'>
          <h2>{character.name}</h2>
          <div className='character-card-top'>
            <div className='character-image'>
            <img src={character.character_image} alt={character.name}/>
            </div>
            <div className='character-description'>
              <p>{character.description}</p>
            </div>
          </div>
          <div className='character-card-bottom'>
            <div className='character-stats'>
            <p>Created by: {character.owner.username}</p>
            <p>Stats: {character.stats}</p>
            <p>{character.members}</p>
            <p>{character.character}</p>
            </div>
            <div className='character-comments'>

            </div>
          </div>
        </div>
        :
        <>
          <h2 className="text-center">
            {hasError.error ? 'Something went wrong!' : 'Loading...'}
          </h2>
          <Spinner />
        </>
      }
    </>
  )
}

export default ShowCharacter