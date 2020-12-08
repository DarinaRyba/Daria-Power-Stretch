const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  duration: String,
  place: String,
  schedule: String,
  description2: String,
  days: [String],
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = model('workout', workoutSchema);
