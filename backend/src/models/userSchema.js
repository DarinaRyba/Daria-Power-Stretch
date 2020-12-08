const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  displayName: String,
  uid: String,
  email: String,
  photo: String,
  phoneNumber: Number,
  age: Number,
  workouts: { type: Schema.Types.ObjectId, ref: 'workouts' }
});

module.exports = model('users', userSchema);
