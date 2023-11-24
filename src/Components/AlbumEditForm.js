import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumEditForm = ({ match }) => {
  const [album, setAlbum] = useState(null);
  const [title, setTitle] = useState('');
  const [release_date, setRelease_date] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`http://localhost:9090/albums/${match.params.id}`);
        const data = await response.json();
        setAlbum(data);
        setTitle(data.title);
        setRelease_date(data.release_date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbum();
  }, [match.params.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://localhost:9090/albums/${match.params.id}`, {
        method: 'PUT',
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

  if (!album) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Album</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Title:</label>
          <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
          <label htmlFor="release_date">Date of Release:</label>
          <input type="text" id="release_date" value={release_date} onChange={(event) => setRelease_date(event.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AlbumEditForm;
