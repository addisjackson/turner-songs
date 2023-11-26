import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumEditForm = () => {
  const [title, setTitle] = useState('');
  const [release_date, setRelease_date] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch('http://localhost:8080/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title, release_date: release_date }),
      });
      navigate('/albums');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="release_date">Date of Release:</label>
          <input
            type="text"
            id="release_date"
            value={release_date}
            onChange={(event) => setRelease_date(event.target.value)}
          />
        </div>
        <button type="submit">Create Album</button>
      </form>
    </div>
  );
};

export default AlbumEditForm;