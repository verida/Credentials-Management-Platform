
const mongoose = require('mongoose')


const ResultSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    healthNumber: String,
    mobileNumber: String,
    did: String,
    testType: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);