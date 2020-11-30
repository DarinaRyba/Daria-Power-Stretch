/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import './WorkoutDetail.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';

function WorkoutDetail({ workout, dispatch }) {
  useEffect(() => {
    if (!workout) {
      dispatch(requestWorkoutDetail(workout));
    }
  }, [workout]);

  return (

    <main>
      <section className="image-detail">
        <div className="image-box">
          <img
            className="image"
            src="https://trello-attachments.s3.amazonaws.com/5fc0f7845fca4370bc8c6bca/5fc3bc45c0a989730344a696/1cdf9a4f390c4d42f788c736be0c6246/Stretching-detail.png"
            alt=""
          />
        </div>
        <div className="image-detail__card">
          <div className="name-detail">
            <h3>{workout?.name}</h3>
          </div>
          <div className="description-detail">
            <p>{workout?.description}</p>
          </div>
          <div className="price-detail">
            <p>
              Price:
              {' '}
              {workout?.price}
              €
            </p>
          </div>
          <div className="btn-wrapper" />
        </div>
      </section>

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
