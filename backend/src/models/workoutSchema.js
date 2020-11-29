const { model, Schema } = require('mongoose');

const workoutSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  creator: { type: Schema.Types.ObjectId, ref: 'user' },
});

module.exports = model('workout', workoutSchema);
