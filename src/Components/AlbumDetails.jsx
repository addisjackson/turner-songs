import React from 'react';
import { Link } from 'react-router-dom';

const AlbumDetails = ({ album, onDelete }) => {
  if (!album) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/albums/${album.id}`, {
        method: 'DELETE',
      });
      onDelete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Album Details</h1>
      <p><strong>Name:</strong> {album.title}</p>
      <p><strong>Year of Release:</strong> {album.year_of_release}</p>
      <div>
        <Link to={`/albums/${album.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default AlbumDetails;
