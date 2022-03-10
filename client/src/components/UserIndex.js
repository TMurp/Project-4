import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
// import Footer from './utilities/Footer'

const UserIndex = () => {

  const [ userData, setUserData ] = useState(null)
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get('/api/users/')
        setUserData(data)
      } catch (error) {
        setHasError({ error: true, message: error.message })
      }
    }
    getAllUsers()
  }, [])

  return (
    <div className='page-wrapper'>
      {userData ?
        <>
          <div className='list'>
            {userData.map(user => {
              const { username, profile_image, stats, description, id  } = user
              return (
                <div key={id} className='div' >
                  
                  <div className='image'>
                    <Link to={`/users/${id}`}>
                      <img src={profile_image} alt={username} />
                    </Link>
                  </div>
                  <div className='description'>
                    <Link to={`/users/${id}`}>
                      <h2>{username}</h2>
                    </Link>
                    <h2>{}</h2>
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

export default UserIndex