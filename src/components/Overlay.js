import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';

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
    desc: {
        fontStyle: "italic",
        fontSize: 14,
      marginBottom: 12,
    },
    origin:{
        border: "1px solid white",
        borderRadius: 4,
        padding: "4px 8px"
    },
    progress: {
        margin: 2,
    },
    button: {
        marginBottom: 8,
    },
  };

class Overlay extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
        };
      }

    render(){

        const { classes, movie, close } = this.props;
        return (
                <div className="movie-details-overlay">
                <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster}`}></img>
                    
                    <div className="movie-details">
                    <Typography className={classes.origin} color="inherit">
                            { movie.country }  - {movie.language}
                    </Typography>
                    <Typography variant="display2" color="inherit">{ movie.movie_title }</Typography>
                    <Typography className={classes.pos} color="inherit">
                            { movie.title_year }
                            </Typography>
                            <br/>
                    <Typography variant="body2"  className={classes.pos} color="inherit">
                    RATING: { movie.popularity_rating } / 10
                    </Typography>
                    <Typography variant="body2"  className={classes.pos} color="inherit">
                    GENRE: { movie.genres.split('|').join(' | ') }
                    </Typography>
                    <br/>
                    <Typography variant="body1"  className={classes.desc} color="inherit">
                    { movie.desc }
                    </Typography>
                    <br/>
                    <Typography variant="subheading"  className={classes.pos} color="inherit">
                        CAST
                    </Typography>
                    <ul>
                        <li>{ movie.actor_1_name }</li>
                        <li>{ movie.actor_2_name }</li>
                    </ul>
                    <Typography variant="subheading"  className={classes.pos} color="inherit">
                        DIRECTED BY
                    </Typography>
                    <ul>
                        <li>{ movie.director_name }</li>
                    </ul>
                    </div>
                    <button className="close-btn" onClick={e=> close()}><i className="material-icons">close</i></button>
                </div>
          );
    }
    
}

Overlay.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
  };

export default withStyles(styles)(Overlay);