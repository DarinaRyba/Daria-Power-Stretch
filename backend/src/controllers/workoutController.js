function workoutController(workoutSchema) {
  function getWorkoutMethod(req, res) {
    const query = { _id: req.params.workoutId };
    workoutSchema.findOne(query, (workoutsError, workout) => {
      if (workoutsError) {
        res.send(workoutsError);
      }
      res.json(workout);
    });
  }

  return { getWorkoutMethod };
}

module.exports = workoutController;
