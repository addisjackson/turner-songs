import { useState } from "react";

const API = process.env.REACT_APP_API_URL;

function SongNewForm({ handleAddSong }) {
  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    is_favorite: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/songs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    })
      .then((res) => res.json())
      .then((data) => handleAddSong(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="AddSong">
      <h2>Add a Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={song.name}
            onChange={(e) => setSong({ ...song, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            id="artist"
            value={song.artist}
            onChange={(e) => setSong({ ...song, artist: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="album">Album:</label>
          <input
            type="text"
            id="album"
            value={song.album}
            onChange={(e) => setSong({ ...song, album: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="is_favorite">Favorite:</label>
          <input
            type="checkbox"
            id="is_favorite"
            checked={song.is_favorite}
            onChange={(e) =>
              setSong({ ...song, is_favorite: e.target.checked })
            }
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
}

export default SongNewForm;
