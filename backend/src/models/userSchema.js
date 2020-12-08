const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  displayName: String,
  uid: String,
  email: String,
  photo: String,
  phoneNumber: Number,
  age: Number,
  days: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }]
});

module.exports = model('User', userSchema);
