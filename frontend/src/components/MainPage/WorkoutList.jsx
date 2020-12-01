import React from 'react';
import './WorkoutList.css';
import { connect } from 'react-redux';
import { requestWorkouts } from '../../redux/actions/workout-actions';

function WorkoutList({ workouts, dispatch }) {
  if (!workouts || !workouts.length) {
    dispatch(requestWorkouts);
  }

  return (
    <>
      <main className="workout-list-container">
        <ul className="workout-list">
          {workouts && workouts.length > 0 && workouts.map((workout) => (
            <li>
              <p>
                Name
                {workout.name}
              </p>
              <p>{workout.description}</p>
              <p>
                Price:
                {workout.price}
                €
              </p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

function mapStateToProps(state) {
  return {
    workouts: state.workoutReducer.workouts,
  };
}

export default connect(mapStateToProps)(WorkoutList);
