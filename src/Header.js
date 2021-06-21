import React from 'react';

const Header = (props) => {
  const { artists, albums, changeView, view } = props;
  return (
    <div>
      <ul id='menu'>
        <li className={view === '' ? 'selected' : ''} id="home" onClick={() => changeView('home')} > Home </li>
        <li className={view === 'artists' ? 'selected' : ''} id="artists" onClick={() => changeView('artists')} > Artists ({artists.length}) </li>
        <li className={view === 'albums' ? 'selected' : ''} id="albums" onClick={() => changeView('albums')} > Albums ({albums.length}) </li>
      </ul>
    </div>
  )
} 

export default Header;