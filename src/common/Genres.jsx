import React from 'react';

export const Genres = ({ moviesGenres, onSelectGenre, selectedGenre }) => {
  // console.log(selectedGenre);
  return (
    <ul className="list-group">
      <li
        onClick={() => onSelectGenre('')}
        className={`list-group-item ${selectedGenre === '' ? 'active' : ''}`}
      >
        All Genres
      </li>
      {moviesGenres.map((genre) => (
        <li
          key={genre._id}
          className={`list-group-item ${
            selectedGenre === genre ? 'active' : ''
          }`}
          onClick={() => onSelectGenre(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};
