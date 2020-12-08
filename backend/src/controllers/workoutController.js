function workoutController (workoutSchema) {
  function getWorkoutMethod (req, res) {
    const query = { _id: req.params.workoutId };

    const getCallback = (workoutsError, workout) => (
      workoutsError ? res.send(workoutsError) : res.json(workout)
    );
    const patata = workoutSchema.findOne(query)
      .populate('days')
      .exec(getCallback);
    console.log(patata);
  }
  return { getWorkoutMethod };
}

module.exports = workoutController;
