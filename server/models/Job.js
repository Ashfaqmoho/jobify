const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    skill: {
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: false
    },
    salary: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: true
    },
    about : {
        type: String,
        required: true
    },
    resp :{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    why : {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model('Job', JobSchema);