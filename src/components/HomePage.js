import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieItem from './MovieItem';
import Overlay from './Overlay';

const styles = {
    card: {
      minWidth: 275,
      width: 300,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
        fontSize: 14,
      marginBottom: 12,
    },
    progress: {
        margin: 2,
    },
    button: {
        marginBottom: 8,
    },
    container: {
        position: 'relative',
      },
      suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: 8,
        left: 0,
        right: 0,
      },
      suggestion: {
        display: 'block',
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
  };

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.movie_title, query);
    const parts = parse(suggestion.movie_title, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }

  function getSuggestionValue(suggestion) {

    return suggestion.movie_title;
  }

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            page: 0,
            searchTerm: "",
            searched: false,
            searchResults: [],
            languages: [],
            countries: [],
            suggestions: [],
            sortOpen: false,
            filterOpen: false,
            sortEl: null
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.cancelSearch = this.cancelSearch.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleSortClose = this.handleSortClose.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
      }
    
    handleChange(event, {newValue}) {
        this.setState({searchTerm: newValue});
        
    }

    handleFilterClick(event) {
        this.setState({filterOpen: !this.state.filterOpen});
    }

    handleSortClick(event) {
        this.setState({sortOpen: !this.state.sortOpen, sortEl: event.currentTarget});
    }
    handleSortClose = () => {
        this.setState({ sortOpen: false, sortEl: null });
      };

    handleFilter(filterType, filterValue) {
        if(filterType == "lang"){
            let index = this.state.languages.indexOf(filterValue);
            //console.log(index);
            if (index > -1) {
                let tempArr = [...this.state.languages];
                tempArr.splice(index, 1)
                this.setState({languages: tempArr});
            }
            else{
                this.setState({languages: [...this.state.languages, filterValue]});
            }
        }
        if(filterType == "co"){
            let index = this.state.countries.indexOf(filterValue);
            if (index > -1) {
                let tempArr = [...this.state.countries];
                tempArr.splice(index, 1)
                this.setState({countries: tempArr});
            }
            else{
                this.setState({countries: [...this.state.countries, filterValue]});
            }
        }
    }

    handleSuggestionClick(event, { suggestionValue }){
        if(suggestionValue != ""){
            //console.log(suggestionValue);
            let searchArr = [];
            let filter = suggestionValue.toUpperCase()
            for(const movie of this.props.locks){
                if(movie.movie_title.toUpperCase().indexOf(filter) > -1){
                    searchArr.push(movie);
                }
            }
            searchArr.sort((a,b) => {
                return a.movie_title.toUpperCase().indexOf(filter) - b.movie_title.toUpperCase().indexOf(filter);
            })
            this.setState({page: 0, searchResults: searchArr, searched: true});
        }
    }
    
      handleSubmit(event) {
        if(event) event.preventDefault();
        if(this.state.searchTerm != ""){
            //console.log(this.state.searchTerm);
            let searchArr = [];
            let filter = this.state.searchTerm.toUpperCase()
            for(const movie of this.props.locks){
                if(movie.movie_title.toUpperCase().indexOf(filter) > -1){
                    searchArr.push(movie);
                }
            }
            searchArr.sort((a,b) => {
                return a.movie_title.toUpperCase().indexOf(filter) - b.movie_title.toUpperCase().indexOf(filter);
            })
            this.setState({ page: 0, searchResults: searchArr, searched: true});
        }
        
      }

      cancelSearch(){
        //console.log("here");
        this.setState({ searchResults: [], searched: false, searchTerm: ""});
      }


      getMovies(locks){

        if(this.state.searched){
            return this.state.searchResults.slice(this.state.page*10, this.state.page*10 + 10).map((lock, key) => {
                return (
                    <MovieItem key={key} lock={lock} seeDetails={this.props.selectMovie}/>
                )
            })
        }

        if(this.state.languages.length > 0 && this.state.countries.length > 0){
            return locks.filter((lock) => {
                    return (this.state.languages.includes(lock.language) && this.state.countries.includes(lock.country));
            }).slice(this.state.page*10, this.state.page*10 + 10).map((lock, key) => {
                return (
                    <MovieItem key={key} lock={lock} seeDetails={this.props.selectMovie}/>
                )
            })
        }
        if(this.state.languages.length > 0)
        {
            return locks.filter((lock) => {
                return (this.state.languages.includes(lock.language));
            }).slice(this.state.page*10, this.state.page*10 + 10).map((lock, key) => {
                return (
                    <MovieItem key={key} lock={lock} seeDetails={this.props.selectMovie}/>
                )
            })
        }
        if(this.state.countries.length > 0){
            return locks.filter((lock) => {
                    return (this.state.countries.includes(lock.country));
            }).slice(this.state.page*10, this.state.page*10 + 10).map((lock, key) => {
                return (
                    <MovieItem key={key} lock={lock} seeDetails={this.props.selectMovie}/>
                )
            })
        }
        return locks.slice(this.state.page*10, this.state.page*10 + 10).map((lock, key) => {
            return (
                <MovieItem key={key} lock={lock} seeDetails={this.props.selectMovie}/>
            )
        })

      }

      handleSuggestionsFetchRequested = ({ value }) => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            let count = 0;

            this.setState({suggestions: inputLength === 0
                    ? []
                    : this.props.locks.filter(suggestion => {
                        const keep =
                        count < 5 && suggestion.movie_title.slice(0, inputLength).toLowerCase() === inputValue;

                        if (keep) {
                        count += 1;
                        }

                        return keep;
                })
            });
      };
    
      handleSuggestionsClearRequested = () => {
        this.setState({
          suggestions: [],
        });
      };

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
          return callback(key, object[key]);
        });
      }

    render(){

        const { classes, isFetchingLocks, locks, sortBy, countries, languages, closeOverlay, overlayOn, selectedMovie } = this.props;
        const autosuggestProps = {
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
            onSuggestionSelected: this.handleSuggestionClick,
          };
        return (
            <div className="main-app-container">
                { overlayOn ? <Overlay movie={selectedMovie} close={closeOverlay}/> : null }
                <div className="sub-appbar">
                
                    <form className="search" onSubmit={this.handleSubmit}>
                        <Typography className="search-label" variant="subheading">
                            Search:
                        </Typography>
                        <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                                classes,
                                placeholder: 'Search a movie by name',
                                value: this.state.searchTerm,
                                onChange: this.handleChange,
                            }}
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                                <Paper {...options.containerProps} square>
                                {options.children}
                                </Paper>
                            )}
                        />
                        <Button className="cancel-btn" onClick={e => this.cancelSearch()}>CANCEL</Button>
                    </form>
                    <div className="toolbars-container">
                    <Button
                        onClick={this.handleFilterClick}
                        className="sort-btn"
                    >
                        FILTER BY <i className="material-icons">filter_list</i>
                    </Button>

                    <Button
                        aria-owns={this.state.sortEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleSortClick}
                        className="sort-btn"
                    >
                        SORT BY <i className="material-icons">sort</i>
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.sortEl}
                        open={this.state.sortOpen}
                        onClose={this.handleSortClose}
                        >
                        <MenuItem onClick={() => { this.handleSortClose;sortBy('title_year', 'asc')}}>RELEASE YEAR (Low to High)</MenuItem>
                        <MenuItem onClick={() => { this.handleSortClose;sortBy('title_year', 'desc')}}>RELEASE YEAR (High to Low)</MenuItem>
                    </Menu>
                    
                    </div>

                </div>

                { isFetchingLocks ? <CircularProgress className={classes.progress} size={50} /> : null }
            
                <div className= { this.state.filterOpen ? 'open filter-container' : 'close filter-container'}>
                    <Typography variant="body1">
                        <b>Language: </b>
                        {
                            languages.map((lang, key) => {
                                return(<span key={key} className="filters">
                                    <input
                                    name={lang}
                                    type="checkbox"
                                    onChange={e =>this.handleFilter("lang", lang)} /> {lang}</span>)
                            })
                        }
                        <br/>
                        <b>Countries: </b>
                        {
                            countries.map((lang, key) => {
                                return(<span key={key} className="filters">
                                    <input
                                    name={lang}
                                    type="checkbox"
                                    onChange={e =>this.handleFilter("co", lang)} /> {lang}</span>)
                            })
                        }
                        
                        
                        
                    </Typography>
                </div>
                
                
                {
                    this.state.searched ? <div><Typography variant="subheading">
                    Found {this.state.searchResults.length} results for "{this.state.searchTerm}"
                    </Typography></div>: null
                }
                <div className="locks-container">
               

                {
                    this.getMovies(locks)
                }
                </div>
                <div className="pagination-container"> 
                {
                    this.state.searched ? 
                    [...Array(parseInt(this.state.searchResults.length/10) + 1)].map((e,i) => {
                        return (<button key={i} onClick={e => {
                            this.setState({ page: i})
                        }} style={{
                            display: (Math.abs(i - this.state.page) < 3 ) ? "inline-block" : "none"
                        }}>{i+1}</button>)
                    }) :
                    [...Array(parseInt(locks.length/10) + 1)].map((e,i) => {
                        return (<button key={i} className={ i === this.state.page ? "active": ""} onClick={e => {
                            this.setState({ page: i})
                        }} style={{
                            display: (Math.abs(i - this.state.page) < 3 ) ? "inline-block" : "none"
                        }}>{i+1}</button>)
                    })
                }
                </div>
            </div>
          );
    }
    
}

HomePage.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    locks: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    sortBy: PropTypes.func.isRequired,
    isFetchingLocks: PropTypes.bool.isRequired,
    selectMovie: PropTypes.func.isRequired,
    closeOverlay: PropTypes.func.isRequired,
    overlayOn: PropTypes.bool.isRequired,
    selectedMovie: PropTypes.object.isRequired,
  };

export default withStyles(styles)(HomePage);