const { model, Schema } = require('mongoose');

const scheduleSchema = new Schema({
  day: String,
  time: String,
  workout: String,
  workouts: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = model('Schedule', scheduleSchema);
