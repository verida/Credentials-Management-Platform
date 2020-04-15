import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  testId: {
    type: String,
    required: true
  },
  result: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Patient', schema);
