import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";


function AlbumDetails() {
  const [album, setAlbum] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API}/albums/${id}`)
      .then((res) => res.json())
      .then((data) => setAlbum(data))
      .catch(() => navigate(`/not-found`));
  }, [id, navigate, API]);

  const deleteAlbum = () => {
    fetch(`${API}/albums/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        navigate(`/albums`);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    deleteAlbum();
  };

  return (
    <div className="main-container">
      <article>
        <h5>
          <span className="large-text">
            <a href={album.url}>{album.title}</a>
          </span>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </h5>
          <div className="small-text"> {album.year_of_release}
          </div>
            <div className="button-container" >
          <div>
            <Link to={`/albums/${id}/edit`}>
              <button className="edit-button">Edit</button>
            </Link>
          </div>
          <div> {" "}
            <Link to={`/albums`}>
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

export default AlbumDetails;
