import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import Spinner from './utilities/Spinner'
import { getPayload, getLocalToken } from '../environment/Auth'

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

  const deleteUser = async () => {
    try {
      await axios.delete(`/api/users/${id}/`, {
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
      {user ?
        <div className='wrapper'>
          <div className='title'>
            <h2>{user.username}</h2>
            {userIsOwner() && <Link className='btn-dark btn' to={`/users/${user.id}/edit`}>Edit Profile</Link>}
            {userIsOwner() && <Link className='btn-dark btn' onClick={deleteUser} to={'/'}>Delete</Link>}
          </div>
          <div className='card-top'>
            <div className='image'>
            <img src={user.profile_image} alt={user.username}/>
            </div>
            <div className='description'>
              <p>{user.description}</p>
            </div>
          </div>
          <div className='card-bottom'>
            <div className='stats'>
            <p>Stats: {user.stats}</p>
            {/* <p>{user.members}</p>
            <p>{user.user}</p> */}
            </div>
            <div className='comments'>
              {/* <p>placeholder text</p> */}
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

export default ShowUser