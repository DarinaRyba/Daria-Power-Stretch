function workoutController (workoutSchema) {
  function getWorkoutMethod (req, res) {
    const query = { _id: req.params.workoutId };

    const getCallback = (workoutsError, workout) => (
      workoutsError ? res.send(workoutsError) : res.json(workout)
    );
    workoutSchema.findOne(query)
      .populate('days')
      .exec(getCallback);
  }
  return { getWorkoutMethod };
}

module.exports = workoutController;
