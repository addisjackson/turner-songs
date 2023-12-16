import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FaTimes, FaPencilAlt } from 'react-icons/fa';

const Album = () => {
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
      await fetch(`http://localhost:8080/albums/${id}`, {
        method: 'DELETE',
      });
      // Remove the deleted album from the state
      setAlbums(albums.filter((album) => album.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <table style={{ borderCollapse: 'collapse' }}>
        {albums.map((album) => (
          <tr key={album.id}>
            <td style={{ textAlign: 'center' }}>
              <FaTimes
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onDelete(album.id)} // Pass album.id to onDelete
              />
            </td>
            <td>{album.title}</td>
            <td>{album.year_of_release}</td>
            <td style={{ textAlign: 'center' }}>
              <Link to={`/albums/${album.id}/edit`}>
                <FaPencilAlt style={{ cursor: 'pointer' }} />
              </Link>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Album;
