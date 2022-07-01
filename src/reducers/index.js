import {
  ADD_MOVIE_FAVORITE,
  REMOVE_MOVIE_FAVORITE,
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  LOADING,
} from "../actions";

const initialState = {
  moviesFavourites: [],
  moviesLoaded: [],
  movieDetail: undefined,
  loading: false,
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.concat(payload),
      };
    case REMOVE_MOVIE_FAVORITE:
      return {
        ...state,
        moviesFavourites: state.moviesFavourites.filter(
          (m) => m.imdbID !== payload.imdbID
        ),
      };
    case GET_MOVIES:
      return { ...state, moviesLoaded: payload.Search };
    case GET_MOVIE_DETAIL:
      return { ...state, movieDetail: payload };
    case LOADING:
      return { ...state, loading: payload };

    default:
      return state;
  }
}
