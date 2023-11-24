import React, { useState, useEffect } from 'react';
import Song from './Song';
import SearchBar from './SearchBar';

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:9090/songs');
        const data = await response.json();
        setSongs(data);
        setFilteredSongs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    filterSongs();
  }, [songs, searchQuery]);

  const filterSongs = () => {
    if (searchQuery) {
      const filtered = songs.filter(
        (song) =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs); // Ensure filteredSongs is set to songs when searchQuery is empty
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (!query) {
      setFilteredSongs(songs); // If query is empty, show all songs
      return; // Return early to avoid unnecessary API calls
    }

    const filtered = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.album.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSongs(filtered);
  };

  const handleDelete = (id) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    setSongs(updatedSongs);
    setFilteredSongs(updatedSongs); // Update filteredSongs when deleting a song
  };

  return (
    <div>
      <SearchBar value={searchQuery} onChange={handleSearch} />
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Delete</th>
            <th>Name</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Favorite</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song) => (
            <Song
              key={song.id}
              id={song.id}
              name={song.name}
              artist={song.artist}
              album={song.album}
              isFavorite={song.is_favorite}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Songs;
