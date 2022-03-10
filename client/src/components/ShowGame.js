import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPayload, getLocalToken } from '../environment/Auth'
// import Spinner from './utilities/Spinner'

const ShowGame = () => {

  const [ game, setGame ] = useState(null)
  const { id } = useParams()
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getSingleGame = async () => {
      try {
        const { data } = await axios.get(`/api/games/${id}/`)
        setGame(data)
        console.log(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getSingleGame()
  }, [id])

  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    return game.owner.id === payload.sub
  }

  const deleteGame = async () => {
    try {
      await axios.delete(`/api/games/${id}/`, {
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
    <div className='wrapper'>
      {game ?
        <div>
          <div className='title'>
            <h2>{game.name}</h2>
            {userIsOwner() && <Link className='btn-dark btn' to={`/games/${id}/edit`}>Edit</Link>}
            {userIsOwner() && <Link className='btn-dark btn' onClick={deleteGame} to={'/'}>Delete</Link>}
          </div>
          <div className='card-top'>
            <div className='image'>
            <img src={game.game_image} alt={game.name}/>
            </div>
            <div className='description'>
              <p>{game.description}</p>
            </div>
          </div>
          <div className='card-bottom'>
            <div className='stats'>
            <p>Created by: {game.owner.username}</p>
            <p>Game Info: {game.stats}</p>
            {/* <p>{game.members}</p>
            <p>{game.character}</p> */}
            </div>
            <div className='comments'>
              {/* <p>placeholder</p> */}
            </div>
          </div>
        </div>
        :
        <>
          {/* <h2 className='text-center'>
            {hasError.error ? 'Something went wrong!' 
            : 
            <Spinner />
            }
          </h2> */}
        </>
      }
    </div>
  )
}

export default ShowGame