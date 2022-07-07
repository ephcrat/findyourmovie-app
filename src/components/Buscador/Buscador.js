import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Buscador.css";
import {
  getMovies,
  addMovieFavorite,
  RemoveMovieFavorite,
} from "../../actions";
// export class Buscador extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//     };
//   }
//   handleChange(event) {
//     this.setState({ title: event.target.value });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.getMovies(this.state.title);
//     this.setState({ title: "" });
//   }

//   addFavorite(movie) {
//     const found = this.props.moviesFavourites.find(
//       (m) => m.id === movie.imdbID
//     );
//     if (!found)
//       return this.props.addMovieFavorite({
//         title: movie.Title,
//         id: movie.imdbID,
//         isFaved: true,
//       });
//   }

//   removeFavorite(movie) {
//     this.props.moviesFavourites.filter((m) => {
//       return m.id !== movie.imdbID;
//     });
//   }
//   render() {
//     const { title } = this.state;
//     return (
//       <div>
//         <h2>Find a Movie</h2>
//         <form className="form-container" onSubmit={(e) => this.handleSubmit(e)}>
//           <div>
//             <label className="label" htmlFor="title">
//               Movie Title:{" "}
//             </label>
//             <input
//               type="text"
//               id="title"
//               autoComplete="off"
//               value={title}
//               onChange={(e) => this.handleChange(e)}
//             />
//           </div>
//           <button type="submit">FIND</button>
//         </form>
//         <ul>
//           {this.props.moviesLoaded?.map((movie) => (
//             <li key={movie.imdbID}>
//               <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
//               <button
//                 style={{ margin: "0.5rem" }}
//                 onClick={() => {
//                   !this.props.moviesFavourites.find(
//                     (m) => m.id === movie.imdbID
//                   )
//                     ? this.addFavorite(movie)
//                     : this.removeFavorite(movie);
//                 }}
//               >
//                 {this.props.moviesFavourites.find((m) => m.id === movie.imdbID)
//                   ? "Faved"
//                   : "Fav"}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

export function Buscador({ getMovies, addMovieFavorite, RemoveMovieFavorite }) {
  let [state, setState] = useState({ title: "" });

  const { title } = state.title;
  const moviesLoaded = useSelector((state) => state.moviesLoaded);
  const moviesFavourites = useSelector((state) => state.moviesFavourites);

  function handleChange(event) {
    setState({ ...state, title: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    getMovies(state.title);
  }

  return (
    <div>
      <h2>Find a Movie</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="title">
            Movie Title:{" "}
          </label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">FIND</button>
      </form>
      <ul>
        {moviesLoaded?.map((movie) => (
          <li key={movie.imdbID}>
            <Link className="link" to={`/movie/${movie.imdbID}`}>
              {movie.Title}
            </Link>
            <button
              className="button"
              style={{ margin: "0.5rem" }}
              onClick={() => {
                moviesFavourites?.find((m) => m.imdbID === movie.imdbID)
                  ? RemoveMovieFavorite(movie)
                  : addMovieFavorite(movie);
              }}
            >
              {moviesFavourites?.find((m) => m.imdbID === movie.imdbID)
                ? "Faved"
                : "Fav"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// function mapStateToProps(state) {
//   return {
//     movies: state.moviesLoaded,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addMovieFavorite: (movie) => dispatch(addMovieFavorite(movie)),
//     getMovies: (title) => dispatch(getMovies(title)),
//   };
// }

export default connect(null, {
  getMovies,
  addMovieFavorite,
  RemoveMovieFavorite,
})(Buscador);
