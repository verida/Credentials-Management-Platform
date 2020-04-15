import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  healthNumber: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Patient', schema);
