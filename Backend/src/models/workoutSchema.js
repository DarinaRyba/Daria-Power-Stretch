const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = model('workout', workoutSchema);
