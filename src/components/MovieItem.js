import React from 'react';
//import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
      minWidth: 275,
      width: 300,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    media: {
        objectFit: 'cover',
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
  };

class MovieItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
        };
      }

    render(){

        const { classes,  lock, seeDetails } = this.props;
        return (
                <li className="lock-cards">
                    <Card className={classes.card}>
                        {lock.backdrop ? <CardMedia
                        component="img"
                        className={classes.media}
                        height="140"
                        image={`https://image.tmdb.org/t/p/w500${lock.backdrop}`}
                        title="Contemplative Reptile"
                        />: null}
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary">
                            {lock.genres.split('|').join(' | ')}
                            </Typography>
                            <Typography variant="display1" color="textPrimary" component="h3">
                            {lock.movie_title}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            { lock.title_year }
                            </Typography>
                            <br/>
                            <Typography variant="body2"  className={classes.pos} color="textPrimary">
                            RATING: { lock.popularity_rating } / 10
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" className={classes.button} color="primary" onClick={() => seeDetails(lock)}>
                            {/* 
                                (lock.unlockState == LOCKED || lock.unlockState == UNLOCK_FAILURE) ? 
                                    <span><i className='material-icons unlock-btn-icon'>lock</i> Unlock</span> : 
                                    (lock.unlockState == UNLOCKING) ?
                                        <span><i className='material-icons unlock-btn-icon'>vpn_key</i> UNLOCKING</span>:
                                        null*/  
                            }
                            SEE DETAILS
                            </Button>
                        </CardActions>
                    </Card>
                </li>
          );
    }
    
}

MovieItem.propTypes = {
    children: PropTypes.element,
    classes: PropTypes.object.isRequired,
    lock: PropTypes.object.isRequired,
    seeDetails: PropTypes.func.isRequired,
  };

export default withStyles(styles)(MovieItem);