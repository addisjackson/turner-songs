import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


function SongDetails() {
  const [song, setSong] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((data) => setSong(data))
      .catch(() => navigate(`/not-found`));
  }, [id, navigate, API]);

  const deleteSong = () => {
    fetch(`${API}/songs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate(`/songs`);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    deleteSong();
  };

  return (
    <div className="main-container">
      <article>
        <h3>
          {song.is_favorite ? <span>⭐️</span> : null} {song.name}
        </h3>
        <h5>
          <span className="large-text">
            <a href={song.url}>{song.name}</a>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h5>
          <div className="small-text"> {song.artist}
  
        <h6>{song.album}</h6>
        <p>{song.title}</p></div>
            <div className="button-container">
          <div>
            <Link to={`/songs/${id}/edit`}>
              <button className="edit-button">Edit</button>
            </Link>
          </div>
          <div> {" "}
            <Link to={`/songs`}>
              <button className="back-button" >Back</button>
            </Link>
          </div>
          <div>
            <button  className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        </div>

      </article>

      </div>
  );
}

export default SongDetails;
