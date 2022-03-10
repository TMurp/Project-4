import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
// import Footer from './utilities/Footer'
import { userIsAuthenticated } from '../environment/Auth'

const CharacterIndex = () => {

  const [ characterData, setCharacterData ] = useState(null)
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        const { data } = await axios.get('/api/characters/')
        setCharacterData(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getAllCharacters()
  }, [])

  return (
    <div className='page-wrapper'>
      {userIsAuthenticated() ?
            <div className='login-prompt'>
              <Link className='btn-dark btn' to='/Createcharacter'>Create character</Link> 
            </div>             
          :
          <div className='login-prompt'>
            <h4>Login to create a character:</h4>
            <Link className='btn-dark btn' to='/Login'>Login</Link>
          </div>
        }
      {characterData ?
        <>
          <div className='list'>
            {characterData.map(character => {
              const { name, character_image, stats, description, id  } = character
              return (
                <div key={id} className='div' >
                  
                  <div className='image'>
                    <Link to={`/characters/${id}`}>
                      <img src={character_image} alt={name} />
                    </Link>
                  </div>
                  <div className='description'>
                    <Link to={`/characters/${id}`}>
                      <h2>{name}</h2>
                    </Link>
                    {/* <h5>{stats}</h5> */}
                    <p>{description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          {/* <Footer /> */}
        </>
      :
        <>
          {/* <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />}
          </h2> */}
        </>
      }
    </div>
  )
}

export default CharacterIndex