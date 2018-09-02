import axios from 'axios'

export function fetchMoviesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchMovies(getState())) {
            //console.log("again");
            return dispatch(fetchMovies());
        }   
    }
}


function fetchMovies() {
    return dispatch => {
        dispatch(requestMovies());
        return axios.get(`https://starlord.hackerearth.com/movieslisting`)
            .then(json => {
                dispatch(receiveMovies(json))
                json.data.slice(0, 10).map(movie => {
                    let imdbArr = movie.movie_imdb_link.split('/');
                    axios.get(`https://api.themoviedb.org/3/find/${imdbArr[imdbArr.length - 2]}?api_key=895fb82146c67b2cb297ba04ecf2433d&external_source=imdb_id`).then(res => {
                        //console.log(res);
                        dispatch(addAdditionalInfo(res, movie))
                    });
                })
                let count = 1;
                let extraInfoInterval = setInterval(() => {
                    json.data.slice(count*10, count*10 + 10).map(movie => {
                        let imdbArr = movie.movie_imdb_link.split('/');
                        axios.get(`https://api.themoviedb.org/3/find/${imdbArr[imdbArr.length - 2]}?api_key=895fb82146c67b2cb297ba04ecf2433d&external_source=imdb_id`).then(res => {
                            //console.log(res);
                            dispatch(addAdditionalInfo(res, movie))
                        });
                    })
                    count = count + 1;
                    if(count > (json.data.length/10 + 1)){
                        clearInterval(extraInfoInterval);
                    }
                }, 5000);    
            })
    }
}

function addAdditionalInfo(res, movie){
    return {
        type: "ADD_ADDITIONAL_INFO",
        info: {...res.data.movie_results[0]},
        movie: movie
    }
}

function shouldFetchMovies(state) {
    const lockState = state.lockControls;
    //console.log(lockState.locks);
    if (!lockState.locks || lockState.locks.length === 0) {
        return true;
    } else if (lockState.isFetching) {
        return false;
    } else {
        return lockState.didInvalidate;
    }
}

function requestMovies() {
    return {
        type: 'REQUEST_MOVIES'
    }
}

function receiveMovies(json) {
    return {
        type: 'RECEIVE_MOVIES',
        results: [ ...json.data ], 
        receivedAt: Date.now()
    }
}

export function selectMovie(movie){
    return {
        type: 'SELECT_MOVIE',
        movie: movie
    }
}

export function closeOverlay(){
    return {
        type: 'CLOSE_OVERLAY'
    }
}

export function sortBy(type, order){
    return dispatch => {
        switch(type){
            case 'title_year':
                return dispatch(sortByYear(order));
            case 'popularity':
                return dispatch(sortByPopularity(order));
        }
            
    }
}

function sortByYear(order) {
    return {
        type: 'SORT_BY_YEAR',
        order: order
    }
}

function sortByPopularity(order) {
    return {
        type: 'SORT_BY_POPULARITY',
        order: order
    }
}