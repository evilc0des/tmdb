export default function lockControlReducers(
    state = {
        locks: [],
        isFetching: false,
        didInvalidate: false,
        selectedMovie: {},
        languages: [],
        countries: [],
        overlayOn: false
    },
    action
) {  
    let lockObj = [];
    switch (action.type) {
        case 'INVALIDATE_MOVIES':
            return Object.assign({}, state, { didInvalidate: true});
        case 'REQUEST_MOVIES':
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case 'RECEIVE_MOVIES':
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                locks: action.results,
                languages: [...(new Set(action.results.map(e => e.language).filter(e => e !== "")))],
                countries: [...(new Set(action.results.map(e => e.country).filter(e => e !== "")))],
                lastUpdated: action.receivedAt
            });

        case 'SELECT_MOVIE':
            return Object.assign({}, state, {
                selectedMovie: action.movie,
                overlayOn: true
            });

        case 'CLOSE_OVERLAY':
            return Object.assign({}, state, {
                overlayOn: false
            });
        case 'SORT_BY_YEAR':
            if(action.order === 'asc'){
                lockObj = [...state.locks].sort((a , b) => {
                    return parseInt(a.title_year) - parseInt(b.title_year)
                })
            } else {
                lockObj = [...state.locks].sort((a , b) => {
                    return parseInt(b.title_year) - parseInt(a.title_year)
                })
            }                
            return Object.assign({}, state, {
                locks: lockObj
            });
        case 'ADD_ADDITIONAL_INFO':
            return Object.assign({}, state, {
                locks: state.locks.map(movie => {
                    if(action.movie.movie_imdb_link == movie.movie_imdb_link)
                        return { ...movie, desc: action.info.overview, poster: action.info.poster_path, backdrop: action.info.backdrop_path, popularity_rating: action.info.vote_average}
                    else return movie
                })
            });
      default:
        return state;
    }
  }