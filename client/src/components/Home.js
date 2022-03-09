import React from 'react'
import gameImage from '../images/home-game.jpeg'
import characterImage from '../images/home-character.jpeg'

const Home = () => {
  return (
    <main>
      <h1>Welcome to The Circle</h1>
      {/* <p>A place for those </p> */}
      <div className='game-display'>
        <img id='gameImage' src={gameImage} alt='Game' />
        <p>Find a game to join! Our users create games for all types of pen and paper rpgs, from the popular Dungeons &amp; Dragons, Shadowrun and Pathfinder to Apocalypse World.
          <br/>
        Don&apos;t see a game you want to join? Create your own and search our playerbase for users or their characters!</p>
      </div>
      <div className='character-display'>
      <img id='characterImage' src={characterImage} alt='Character' />
      <p>Browse our users and their characters, invite them to your game and get playing! Or create a character of your own and jump into someone&apos;s game!</p>
      </div>
    </main>
  )
}

export default Home