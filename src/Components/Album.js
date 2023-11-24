import React, { useState, useEffect } from 'react';
import Album from './Album';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

const Songs = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:9090/albums');
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums</h1>
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
              <td><Album album={album} /></td>
              <td>{album.title}</td>
              <td>{album.year_of_release}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/albums/${album.id}/edit`}><FaPencilAlt style={{ cursor: 'pointer' }} /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
