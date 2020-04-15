import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Patient', schema);
