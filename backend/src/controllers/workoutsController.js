function workoutsController (workoutSchema) {
  function getWorkoutMethod (req, res) {
    const query = {};
    workoutSchema.find(query, (workoutsError, workouts) => {
      if (workoutsError) {
        res.send(workoutsError);
      }
      res.json(workouts);
    });
  }

  function postWorkoutMethod (req, res) {
    const query = req.body;
    workoutSchema.create(query, (workoutsError, workout) => {
      if (workoutsError) {
        return res.send(workoutsError);
      }
      return res.json(workout);
    });
  }

  function patchWorkoutMethod ({ body }, res) {
    workoutSchema.findByIdAndUpdate(body._id, body, (workoutsError, workout) => {
      if (workoutsError) {
        return res.send(workoutsError);
      }
      return res.json(workout);
    });
  }

  function deleteWorkoutMethod ({ body }, res) {
    workoutSchema.findByIdAndRemove(body._id, body, (workoutsError, workout) => {
      if (workoutsError) {
        return res.send(workoutsError);
      }
      return res.json(workout);
    });
  }

  return {
    getWorkoutMethod, patchWorkoutMethod, postWorkoutMethod, deleteWorkoutMethod
  };
}

module.exports = workoutsController;
