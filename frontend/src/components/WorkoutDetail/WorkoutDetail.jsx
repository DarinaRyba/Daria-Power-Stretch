import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WorkoutDetail.css';
import Button from 'react-bootstrap/Button';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import EventIcon from '@material-ui/icons/Event';
import { requestWorkoutDetail } from '../../redux/actions/workout-actions';
import { createUserBooking, signInWithGoogle } from '../../redux/actions/user-actions';

function WorkoutDetail({
  workout, dispatch, match, user,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { workoutId } = match.params;

  function handleBook(day) {
    dispatch(createUserBooking(user, day));
    handleClose();
  }

  const handleLogin = () => {
    dispatch(signInWithGoogle());
  };

  useEffect(() => {
    if (!workout || workoutId !== workout._id) {
      dispatch(requestWorkoutDetail(workoutId));
    }
  }, [workout, workoutId]);

  return (

    <main className="detail-wrapper">
      <div className="detail__image">
        <img
          className="image"
          src={workout?.image}
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
        <div className="detail_card-info">
          <div className="icon-wrapper">
            <AccessTimeIcon />
            <p className="icon-separator">
              {' '}
              {workout?.duration}
            </p>
          </div>
          <div className="icon-wrapper">
            <p className="icon-separator">
              <PlaceIcon />
              {' '}
              {workout?.place}
            </p>
          </div>
        </div>
        <div className="detail__card-schedule">
          <div className="icon-wrapper">
            <EventIcon />
            <p className="icon-separator">
              {' '}
              {workout?.scheduleInfo}
            </p>
          </div>
        </div>

        <div className="detail__card-button">
          {user
            ? (
              <Button className="btn-book" variant="primary" onClick={handleShow}>
                Book
              </Button>
            )
            : (
              <Button onClick={() => handleLogin()} className="btn-book" variant="primary">
                Login to book
              </Button>
            )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose your day</Modal.Title>
            </Modal.Header>
            <ul className="modal-card-list">
              {workout?.days && workout?.days.map((workoutItem) => (

                <li key={performance.now() * Math.random()} className="modal-list">
                  <Modal.Body>
                    {workoutItem.date}
                    ;
                    {' '}
                    {workoutItem.time}
                    {' '}

                    <Button className="btn-book" variant="primary" onClick={() => handleBook(workoutItem.date)}>
                      Book
                    </Button>

                  </Modal.Body>
                </li>

              ))}

            </ul>
            <Modal.Footer>
              <Button className="btn-book" variant="secondary" onClick={handleClose}>
                Close
              </Button>

            </Modal.Footer>
          </Modal>

        </div>
      </div>

    </main>
  );
}

WorkoutDetail.propTypes = {
  workout: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    scheduleInfo: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      workoutId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

WorkoutDetail.defaultProps = {
  workout: null,
};

function mapStateToProps(state) {
  return {
    workout: state.workoutReducer.workout,
    user: state.usersReducer.user,
    isLogged: state.usersReducer.isLogged,

  };
}

export default connect(mapStateToProps)(WorkoutDetail);
