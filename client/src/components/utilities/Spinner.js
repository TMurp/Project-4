import React from 'react'
import spinner from '../../images/logo-clear.png'

const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <img className="spinner" src={spinner} alt="spinner" />
    </div>
  )
}

export default Spinner