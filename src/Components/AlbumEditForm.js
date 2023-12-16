import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function AlbumEditForm() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [album, setAlbum] = useState({
    title: "",
    year_of_release: "",
  });

  const updateAlbum = (updatedAlbum) => {
    fetch(`${API}/albums/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAlbum),
    })
      .then(() => navigate(`/albums/${id}`))
      .catch((err) => console.log(err));
  };

  const handleTextChange = (event) => {
    setAlbum({ ...album, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    fetch(`${API}/albums/${id}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch(() => navigate(`/not-found`));
  }, [id, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateAlbum(album, id);
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Album Title:</label>
        <input
          id="title"
          value={album.title}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Album"
          required
        />
        <label htmlFor="album">Year of Release:</label>
        <input
          id="year"
          type="text"
          name="year"
          value={album.year_of_release}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/albums/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default AlbumEditForm;
