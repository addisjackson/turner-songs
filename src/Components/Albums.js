import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:8080/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  const onDelete = async (id) => {
    try {
      // Make a DELETE request to your API endpoint with the specified ID
      await fetch(`http://localhost:8080/albums/${id}`, {
        method: 'DELETE',
      });
      // Remove the deleted album from state
      setAlbums(albums.filter((album) => album.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Year of Release</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td style={{ textAlign: 'center' }}>
                <FaTimes
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => onDelete(album.id)}
                />
              </td>
             
              <td>{album.title}</td>
              <td>{album.release_date}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/albums/${album.id}/edit`}>
                  <FaPencilAlt style={{ cursor: 'pointer' }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Albums;