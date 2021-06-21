import React from 'react';

const Albums = (props) => {
  const { albums } = props;
  return (
    <div>
        <ul id='albumslist'>
        {
            albums.map(album => {
                return(
                    <li key={album.id}>{album.name}
                        <ul className="abc">
                            <li>{album.artist.name}</li>
                        </ul>
                    </li>
                )
            })
        }
        </ul>
    </div>
  )
} 

export default Albums;