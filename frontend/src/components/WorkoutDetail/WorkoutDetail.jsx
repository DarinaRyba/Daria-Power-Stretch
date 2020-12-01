/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WorkoutDetail.css';
import Button from 'react-bootstrap/Button';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';

function WorkoutDetail({ workout, dispatch }) {
  useEffect(() => {
    if (!workout) {
      dispatch(requestWorkoutDetail(workout));
    }
  }, [workout]);

  return (

    <main className="detail-wrapper">
      <div className="detail__image">
        <img
          className="image"
          src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc3bc45c0a989730344a696/1cdf9a4f390c4d42f788c736be0c6246/Stretching-detail.png"
          alt=""
        />
      </div>
      <div className="detail__card">
        <div className="detail__card-name">
          <h4>{workout?.name}</h4>
        </div>
        <div className="detail__card-description">
          <p>{workout?.description}</p>
        </div>
        <div className="detail__card-price">
          <p>
            Price:
            {' '}
            {workout?.price}
            €
          </p>
        </div>
        <div className="detail__card-button">
          <Button className="btn-book" variant="light">Book</Button>
        </div>
      </div>

    </main>
  );
}

WorkoutDetail.propTypes = {
  workout: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    workout: state.workoutReducer.workout,
  };
}

export default connect(mapStateToProps)(WorkoutDetail);
