import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaPencilAlt, FaStar } from 'react-icons/fa';

const Song = ({ id, name, artist, album, isFavorite, onDelete }) => {
  return (
    <tr>
      <td style={{ textAlign: 'center' }}>
        <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(id)} />
      </td>
      <td><Link to={`/songs/${id}`}>{name}</Link></td>
      <td>{artist}</td>
      <td>{album}</td>
      <td style={{ textAlign: 'center', color: isFavorite ? 'gold' : 'black' }}>
        {isFavorite ? <FaStar /> : null}
      </td>
      <td style={{ textAlign: 'center' }}>
        <Link to={`/songs/${id}/edit`}><FaPencilAlt style={{ cursor: 'pointer' }} /></Link>
      </td>
    </tr>
  );
};

export default Song;
