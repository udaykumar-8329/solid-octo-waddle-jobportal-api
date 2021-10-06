const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');

const Candidate = mongoose.model('Candidates');

module.exports.register = (req,res,next) => {
    console.log(req.body)
    var candidate = new Candidate();
    candidate.firstName = req.body.firstName;
    candidate.lastName = req.body.lastName;
    candidate.dateOfBirth = req.body.dateOfBirth;
    candidate.email = req.body.email;
    candidate.isRecruiter = req.body.isRecruiter;
    candidate.password = req.body.password
    if(candidate.isRecruiter){
        candidate.companyName = req.body.companyName;
    }
    candidate.save((err,doc)=>{
        if (!err)
            res.json({data: doc, status: true});
        else {
            console.log(err);
            if (err.code == 11000)
                res.status(422).json({data: {message: 'Duplicate email adrress found.'}, status: false});
            else
                return next(err);
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {  
             
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user){
            if(req.body.isRecruiter == user.isRecruiter){
                return res.status(200).json({ "token": user.generateJwt(), role: user.isRecruiter? 'Recruiter': 'Candidate', userId: user._id, "status": true});
            }else{
                return res.status(200).json({"data": {"message": "emailid not registered"},"status": false});
            }
        }
        // unknown user or wrong password
        else return res.status(200).json({"data": info, "status": false});
    })(req, res);
}
