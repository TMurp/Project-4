import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Spinner from './utilities/Spinner'
import { getPayload } from '../environment/Auth'

const ShowUser = () => {

  const [ user, setUser ] = useState(null)
  const { id } = useParams()
  const [ hasError, setHasError ] = useState({ error: false, message: '' })

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        console.log(id)
        const { data } = await axios.get(`/api/users/${id}/`)
        setUser(data)
      } catch (err) {
        setHasError({ error: true, message: err.message })
      }
    }
    getSingleUser()
  }, [id])

  const userIsOwner = () => {
    const payload = getPayload()
    if (!payload) return
    return user.id === payload.sub
  }

  return (
    <>
      {user ?
        <div className='user-wrapper'>
          <h2>{user.username}</h2>
          <div className='user-card-top'>
            <div className='user-image'>
            <img src={user.profile_image} alt={user.username}/>
            </div>
            <div className='user-description'>
              <p>{user.description}</p>
            </div>
          </div>
          <div className='user-card-bottom'>
            <div className='user-stats'>
            <p>Stats: {user.stats}</p>
            {/* <p>{user.members}</p>
            <p>{user.user}</p> */}
            </div>
            <div className='user-comments'>

            </div>
          </div>
          {userIsOwner() && <Link className='btn-dark btn' to={`/users/${user.id}/edit`}>Edit Profile</Link>}
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

export default ShowUser