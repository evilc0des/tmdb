import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {fetchMoviesIfNeeded, sortBy, selectMovie, closeOverlay} from '../../actions/locks';
import HomePage from "../HomePage";

export class HomeContainer extends React.Component {

    componentDidMount() {
        
        const { fetchMoviesIfNeeded } = this.props;
        //console.log(fetchLocksIfNeeded);
        fetchMoviesIfNeeded();
    }

  
    render() {
      const { sortBy, countries, languages, selectMovie, closeOverlay, overlayOn, selectedMovie } = this.props;

      return (
        <HomePage
          locks = {this.props.locks}
          isFetchingLocks = {this.props.isFetching}
          sortBy = {sortBy}
          countries = {countries}
          languages = {languages}
          selectMovie={selectMovie}
          closeOverlay = {closeOverlay}
          overlayOn = {overlayOn}
          selectedMovie ={selectedMovie}
        />
      );
    }
  }
  
  HomeContainer.propTypes = {
    locks: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchMoviesIfNeeded: PropTypes.func.isRequired,
    sortBy: PropTypes.func.isRequired,
    selectMovie: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    overlayOn: PropTypes.bool.isRequired,
    selectedMovie: PropTypes.object.isRequired,
  };
  
  function mapStateToProps(state) {
    return {
      locks: state.lockControls.locks,
      countries: state.lockControls.countries,
      languages: state.lockControls.languages,
      isFetching: state.lockControls.isFetching,
      overlayOn: state.lockControls.overlayOn,
      selectedMovie: state.lockControls.selectedMovie,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        fetchMoviesIfNeeded: () => {
            dispatch(fetchMoviesIfNeeded());
        },
        sortBy: (type, order) => {
          dispatch(sortBy(type, order));
        },
        selectMovie: (movie) => {
          dispatch(selectMovie(movie));
        },
        closeOverlay: () => {
          dispatch(closeOverlay());
        }
    };
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer);