import React from 'react';

const Artists = (props) => {
  const { artists } = props;
  return (
    <div>
      <ul id='artistslist'>
        {
          artists.map(artist => {
            return (
              <li key={artist.id}>{artist.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
} 

export default Artists;