import React from 'react';
import './WorkoutList.css';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import { requestWorkouts } from '../../redux/actions/workout-actions';

const useStyles = makeStyles({
  root: {
    maxWidth: 370,
    background: '#edebe5',
    color: '#41555a',
    height: '500px',
    fontFamily: 'Poppins',
  },
});

function WorkoutList({ workouts, dispatch }) {
  const classes = useStyles();
  if (!workouts || !workouts.length) {
    dispatch(requestWorkouts());
  }

  return (

    <main className="workout-list-container">
      <ul className="workout-list">
        {workouts && workouts.map((workout) => (
          <li className="list">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="250"
                  image={workout.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {workout.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {workout.description2}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price:
                    {' '}
                    {workout.price}
                    €
                  </Typography>
                  <Typography variant="body2" component="p">
                    <AccessTimeIcon />
                    {workout.duration}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <PlaceIcon />
                    {workout.place}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <EventIcon />
                    {workout.schedule}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

          </li>
        ))}
      </ul>
    </main>

  );
}

function mapStateToProps(state) {
  return {
    workouts: state.workoutReducer.workouts,
  };
}

export default connect(mapStateToProps)(WorkoutList);
