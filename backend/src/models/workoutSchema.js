const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  duration: String,
  place: String,
  scheduleInfo: String,
  description2: String,
  days: { type: Schema.Types.ObjectId, ref: 'schedules' }
});

module.exports = model('workouts', workoutSchema);
