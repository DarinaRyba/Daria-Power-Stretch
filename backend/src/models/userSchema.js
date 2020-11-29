const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  name: String,
  googleUser: String,
  participating_in: [{ type: Schema.Types.ObjectId, ref: 'workout' }],
  owner_of: [{ type: Schema.Types.ObjectId, ref: 'workout' }],
});

module.exports = model('user', userSchema);
