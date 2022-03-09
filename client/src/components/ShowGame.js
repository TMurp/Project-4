import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './utilities/Spinner'

const ShowGame = () => {

  const [ game, setGame ] = useState(null)
  const { id } = useParams()
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getSingleGame = async () => {
      try {
        const { data } = await axios.get(`/api/games/${id}/`)
        setGame(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleGame()
  }, [id])

  return (
    <>
      {game ?
        <div className='game-wrapper'>
          <h2>{game.name}</h2>
          <div className='game-card-top'>
            <div className='game-image'>
            <img src={game.game_image} alt={game.name}/>
            </div>
            <div className='game-description'>
              <p>{game.description}</p>
            </div>
          </div>
          <div className='game-card-bottom'>
            <div className='game-stats'>
            <p>{game.stats}</p>
            <p>{game.owner.username}</p>
            <p>{game.members}</p>
            <p>{game.character}</p>
            </div>
            <div className='game-comments'>

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

export default ShowGame