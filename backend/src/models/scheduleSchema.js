const { model, Schema } = require('mongoose');

const scheduleSchema = new Schema({
  day: String,
  time: String,
  workout: String,
  participants: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

module.exports = model('schedules', scheduleSchema);
