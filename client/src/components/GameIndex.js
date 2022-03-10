import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
// import Footer from './utilities/Footer'
import { userIsAuthenticated } from '../environment/Auth'

const GameIndex = () => {

  const [ gameData, setGameData ] = useState(null)
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getAllGames = async () => {
      try {
        const { data } = await axios.get('/api/games/')
        setGameData(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getAllGames()
  }, [])

  return (
    <div className='page-wrapper'>
      {userIsAuthenticated() ?
            <div className='login-prompt'>
              <Link className='btn-dark btn' to='/Creategame'>Create game</Link> 
            </div>             
          :
          <div className='login-prompt'>
            <h4>Login to create a game:</h4>
            <Link className='btn-dark btn' to='/Login'>Login</Link>
          </div>
        }
      {gameData ?
        <>
          <div className='list'>
            {gameData.map(game => {
              const { name, game_image, stats, description, id  } = game
              return (
                <div key={id} className='div' >
                  
                  <div className='image'>
                    <Link to={`/games/${id}`}>
                      <img src={game_image} alt={name} />
                    </Link>
                  </div>
                  <div className='description'>
                    <Link to={`/games/${id}`}>
                      <h2>{name}</h2>
                    </Link>
                    <h5>{stats}</h5>
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

export default GameIndex