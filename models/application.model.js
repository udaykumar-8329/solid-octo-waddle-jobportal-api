const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Applciation Schema
const applicationSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required : true
    },
    resume: {
        type: String,
        required: false
    },
    jobId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    }
});


// Custom validation for email
applicationSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Application', applicationSchema);