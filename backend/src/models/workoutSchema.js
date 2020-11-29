const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
  description: String,
  price: Number,
});

module.exports = model('workout', workoutSchema);
