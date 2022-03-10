import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <h1>Welcome to The Circle</h1>
      <div className='game-display'>
      <Link to='/Games/10/' className='nav-link'><img id='gameImage' src={'https://i.pinimg.com/564x/d5/2e/4d/d52e4d3294e81140687b04b70a0cf8ac.jpg'} alt='Game' /></Link>
        <p>Find a game to join! Our users create games for all types of pen and paper rpgs, from the popular Dungeons &amp; Dragons, Shadowrun and Pathfinder to Apocalypse World.
          <br/>
          <br/>
        Don&apos;t see a game you want to join? Create your own and search our playerbase for users or their characters!
          <br/>
          <br/>
        The featured game this week is <strong>Harridus - City of the Dead</strong>.
          <br/>
          <i>'After the tragic death of your brother you vowed to do anything to bring him back. Legend says those who find Harridus can find the souls of the dead. Seek Harridus, find your brother, bring him back.'</i></p>
      </div>
      <div className='character-display'>
      <Link to='/Characters/6/' className='nav-link'><img id='characterImage' src={'https://i.pinimg.com/564x/f7/77/8a/f7778a54d67b547f1fb93e4e04e38d00.jpg'} alt='Character' /></Link>
      <p>Browse our users and their characters, invite them to your game and get playing! Or create a character of your own and jump into someone&apos;s game!</p>
      </div>
    </main>
  )
}

export default Home