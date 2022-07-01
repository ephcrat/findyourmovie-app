import axios from "axios";

export const ADD_MOVIE_FAVORITE = "add movie favorite";
export const REMOVE_MOVIE_FAVORITE = "remove movie favorite";
export const GET_MOVIES = "get movies";
export const GET_MOVIE_DETAIL = "get movie detail";
export const LOADING = "loading";
export const ISFAVED = "isFaved";

export function addMovieFavorite(payload) {
  return { type: ADD_MOVIE_FAVORITE, payload };
}

export function getMovies(titulo) {
  return async function (dispatch) {
    return fetch(
      `http://www.omdbapi.com/?apikey=cc86a7d2&s=${titulo}&type=movie`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_MOVIES, payload: json });
      });
  };
}

export function getMovieDetail(payload) {
  return async function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=cc86a7d2&i=${payload}&plot=full`
    );
    dispatch({ type: GET_MOVIE_DETAIL, payload: response.data });
    dispatch({ type: LOADING, payload: false });
  };
}

export function RemoveMovieFavorite(payload) {
  return { type: REMOVE_MOVIE_FAVORITE, payload };
}
