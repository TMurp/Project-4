import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteNav from './components/SiteNav'
import Home from './components/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import GameIndex from './components/GameIndex'
import CreateGame from './components/forms/CreateGame'
import CharacterIndex from './components/CharacterIndex'
import CreateCharacter from './components/forms/CreateCharacter'
import ShowGame from './components/ShowGame'
import ShowCharacter from './components/ShowCharacter'
// import Footer from './components/utilities/Footer'

function App() {

  return (
    <>
      <BrowserRouter>
        <SiteNav />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Games' element={<GameIndex />} />
          <Route path='/Games/:id' element={<ShowGame />} />
          <Route path='/Creategame' element={<CreateGame />} />
          <Route path='/Characters' element={<CharacterIndex />} />
          <Route path='/Characters/:id' element={<ShowCharacter />} />
          <Route path='/Createcharacter' element={<CreateCharacter />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}

export default App
