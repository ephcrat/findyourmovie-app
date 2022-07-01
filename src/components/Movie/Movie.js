import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  addMovieFavorite,
  RemoveMovieFavorite,
} from "../../actions/index";

import "./Movie.css";

// class Movie extends React.Component {
//   componentDidMount() {
//     this.props.getMovieDetail(this.props.match.params.id);
//   }

//   render() {
//     return (
//       <div className="movie-detail">
//         Detalle de la pelicula
//         <div>
//           <img
//             src={this.props.movieDetail.Poster}
//             alt={this.props.movieDetail.Title}
//           />
//         </div>
//         <ul>
//           <li>
//             {this.props.movieDetail.Title}{" "}
//             <span>({this.props.movieDetail.Year})</span>
//           </li>

//           <li>Runtime: {this.props.movieDetail.Runtime}</li>
//           <li>Genre: {this.props.movieDetail.Genre}</li>
//           <li>Actors: {this.props.movieDetail.Actors}</li>
//           <li>Metascore: {this.props.movieDetail.Metascore}</li>
//           <li> IMDB rating: {this.props.movieDetail.imdbRating}</li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default connect(
//   (state) => ({
//     movieDetail: state.movieDetail,
//   }),
//   { getMovieDetail }
// )(Movie);

export default function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const movieDetail = useSelector((state) => state.movieDetail);
  const loading = useSelector((state) => state.loading);
  const moviesFavourites = useSelector((state) => state.moviesFavourites);
  React.useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  if (loading || !movieDetail)
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      </div>
    );
  return (
    <div className="movie-detail">
      <div style={{ textAlign: "center" }}>
        <h1> Movie Details </h1>
      </div>
      <button
        className="button"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          moviesFavourites?.find((m) => m.imdbID === id)
            ? dispatch(RemoveMovieFavorite(movieDetail))
            : dispatch(
                addMovieFavorite({
                  Title: movieDetail.Title,
                  Year: movieDetail.Year,
                  imdbID: id,
                  Type: movieDetail.Type,
                  Poster: movieDetail.Poster,
                })
              );
        }}
      >
        {moviesFavourites?.find((m) => m.imdbID === id) ? "Faved" : "Fav"}
      </button>
      <div
        className="details"
        style={{ display: "flex", alignContent: "center" }}
      >
        <div style={{ display: "inline-flex", padding: "1rem" }}>
          <img src={movieDetail.Poster} alt={movieDetail.Title} />
        </div>
        <ul>
          <li>
            {movieDetail.Title} <span>({movieDetail.Year})</span>
          </li>
          <li>Runtime: {movieDetail.Runtime}</li>
          <li>Genre: {movieDetail.Genre}</li>
          <li>Actors: {movieDetail.Actors}</li>
          <li>Metascore: {movieDetail.Metascore}</li>
          <li> IMDB rating: {movieDetail.imdbRating}</li>
          <li>
            {" "}
            <p>Plot:</p>
            {movieDetail.Plot}
          </li>
        </ul>
      </div>
    </div>
  );
}
