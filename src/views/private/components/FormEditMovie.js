import { useState } from "react";
import Modal from "../../../components/Modal";
import imageLogo from "../../../assets/img/img-icon.jpg";
import toast from "react-hot-toast";
import { useEffect } from "react";
function AlertObligatoryField({ controlName, isInvalidForm }) {
  return (
    <>
      {isInvalidForm === false && controlName === "" && (
        <span style={{ color: "red" }}> Obligatory field </span>
      )}
    </>
  );
}

function ValidateForm(controlName) {
  let result = false;
  controlName === "" || controlName === null
    ? (result = true)
    : (result = false);
  return result;
}

function imageNullPath(path) {
  if (path === "" || path === null) {
    path = imageLogo;
  }
  return path;
}

function validateFormTypeNUmber(controlName) {
  let result = false;
  controlName <= 0? (result= true) : (result=false);
  return result;
}

function FormEditMovie({ characterApiMovie, setShowModal, showModal }) {
  const [isInvalidForm, setInvalidForm] = useState();

  //Varibles para los atributos
  const [nameFilm, setNameFilm] = useState(characterApiMovie.title || "");
  const [relaseDate, setRelaseDate] = useState(
    characterApiMovie.release_date || ""
  );
  const [rating, setRating] = useState(characterApiMovie.rating || 0);
  const [cast, setCast] = useState(characterApiMovie.cast || "");
  const [genre, setGenre] = useState(characterApiMovie.genre.id || "");
  const [team, setTeam] = useState(characterApiMovie.team || "");
  const [imgMovie, setImageMovie] = useState(
    characterApiMovie.preview_image || ""
  );

  const [genreArray, setGenreArray] = useState([]);

  const reqApi = async () => {
    const api = await fetch("http://localhost:3000/genre/");
    const genres = await api.json();
    setGenreArray(genres);
  };

  useEffect(() => {
    reqApi();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const updateMovie = () => {

    if(validateFormTypeNUmber(rating) === true){
      toast.error('Change value rating')
      return;
    }

    if(isInvalidForm == true){
      toast.error('Form is invalid');
      return;
    }

    const movie = characterApiMovie;
    movie.title = nameFilm;
    movie.release_date = relaseDate;
    movie.rating = rating;
    movie.cast = cast;
    movie.genre = genreArray.filter((res) => res.id == genre)[0];
    movie.team = team;
    movie.preview_image = imgMovie;
    fetch(`http://localhost:3000/movies/${characterApiMovie.id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        toast.success("Updated successfully");
      });
  };

  return (
    <>
      <Modal
        closeModal={closeModal}
        showModal={showModal}
        titleModal={"Edit Movie"}
        content={
          <div className="modal-form">
            <form className="form-style-register">
              <div className="form">
                <label htmlFor="email">Enter the name of the movie:</label>
                <input
                  className={
                    ValidateForm(nameFilm) === true && nameFilm === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={nameFilm}
                  onChange={(e) => {
                    setNameFilm(e.target.value);
                    setInvalidForm(ValidateForm(nameFilm));
                  }}
                  type="text"
                  name="email"
                  id="email"
                />
                <AlertObligatoryField
                  controlName={nameFilm}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="relaseDate">Enter the release date:</label>
                <input
                  className={
                    ValidateForm(relaseDate) === true && relaseDate === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={relaseDate}
                  onChange={(e) => {
                    setRelaseDate(e.target.value);
                    setInvalidForm(ValidateForm(relaseDate));
                  }}
                  type="date"
                  name="relaseDate"
                  id="relaseDate"
                />
                <AlertObligatoryField
                  controlName={relaseDate}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="rating">Enter the rating:</label>
                <input
                  className={
                    ValidateForm(rating) === true && rating === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                    setInvalidForm(ValidateForm(rating));
                  }}
                  type="number"
                  id="rating"
                />
                <AlertObligatoryField
                  controlName={rating}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="cast">Enter the cast:</label>
                <input
                  className={
                    ValidateForm(cast) === true && cast === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={cast}
                  onChange={(e) => {
                    setCast(e.target.value);
                    setInvalidForm(ValidateForm(cast));
                  }}
                  type="text"
                  id="cast"
                />
                <AlertObligatoryField
                  controlName={cast}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="genre">Enter the genre:</label>
                <select
                  name="selectedFruit"
                  value={genre}
                  id="genre"
                  onChange={(e) => setGenre(e.target.value)}
                >
                  {genreArray.map((res) => (
                    <option key={res.id} value={res.id}>{res.name}</option>
                  ))}
                </select>
                <AlertObligatoryField
                  controlName={genre}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="team">Enter the team:</label>
                <textarea
                  className={
                    ValidateForm(team) === true && team === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={team}
                  onChange={(e) => {
                    setTeam(e.target.value);
                    setInvalidForm(ValidateForm(team));
                  }}
                  type="text"
                  id="team"
                />
                <AlertObligatoryField
                  controlName={team}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="form">
                <label htmlFor="image">Enter path image:</label>
                <textarea
                id="image"
                  className={
                    ValidateForm(imgMovie) === true && imgMovie === ""
                      ? "border-danger"
                      : "border-white"
                  }
                  value={imgMovie}
                  onChange={(e) => {
                    setImageMovie(e.target.value);
                    setInvalidForm(ValidateForm(imgMovie));
                  }}
                  type="text"
                />
                <AlertObligatoryField
                  controlName={imgMovie}
                  isInvalidForm={isInvalidForm}
                ></AlertObligatoryField>
              </div>
              <div className="image-view">
                <img
                  src={imageNullPath(imgMovie)}
                  alt={"Imagen de la pelicula"}
                />
              </div>
            </form>
            <hr></hr>
            <div className="modal-footer">
              <div className="modal-buttons">
                <button className="btn-edit" onClick={updateMovie}>
                  Update <i className="fas fa-pencil"></i>
                </button>
                <button
                  className="btn-delete"
                  onClick={(e) => setShowModal(false)}
                >
                  Cancel <i className="fas fa-xmark"></i>
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
}
export default FormEditMovie;
