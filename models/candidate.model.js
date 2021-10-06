const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// Candidate Schema
const candidateSchema = new Schema({
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
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required : true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [8, 'Password must be atleast 8 characters long']
    },
    saltSecret: String,
    isRecruiter:{
        type: Boolean,
        default: false
    },
    companyName: {
        type: String,
        required: false
    }
});


// Custom validation for email
candidateSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
candidateSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(!err){
                this.password = hash;
                this.saltSecret = salt;
            }
            else{
                console.log(err);
            }
            next();
        });
    });
});


// Methods
candidateSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

candidateSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('Candidates', candidateSchema);