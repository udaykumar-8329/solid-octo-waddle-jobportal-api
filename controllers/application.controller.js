const mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

const Job = mongoose.model('jobs');
const Application = mongoose.model('Application');

module.exports.addApplication = (req,res) => {
    console.log(req.body);
    var application = new Application();
    application.firstName = req.body.firstName ;
    application.lastName = req.body.lastName ;
    application.email = req.body.email ;
    application.dateOfBirth = req.body.dateOfBirth ;
    application.resume = req.body.resume ;
    application.jobId = req.body.jobId;
    application.userId = req.body.userId;

    application.save((err,docs)=> {
        if(!err) res.json({data: docs, status: true});
        else res.json({status: false, data: err});
    })
}

module.exports.getApplicants = (req,res) => {
    console.log(req.params.jobId)
    Application.find({jobId: ''+req.params.jobId},(err,docs)=>{
        if(!err) {
            console.log(docs)
            res.json({data: docs, status: true});
        }
        else res.json({data: err, status: false});
    })
}

module.exports.checkIfAlreadyApplied = (req,res) => {
    console.log(req.params);
    Application.find({jobId: req.params.jobId, userId: req.params.userId }, (err,docs) => {
        console.log(docs);
        if(!err){
            if(docs.length>0){
                res.json({applied: true, status: true});
            }else{
                res.json({applied: false, status: true})
            }
        }
        else{ 
            res.json({error: err, status: false});
        }
    })
}

module.exports.downloadResume = (req,res) => {
    console.log(req.body.location);
    const file = path.join(`../uploads/` ,(req.body.location).split('\\')[1]);
    console.log(file);
    res.sendFile((req.body.location).split('\\')[1], { root: './uploads' });
}

module.exports.getAllApplications = (req,res) => {
    console.log('params',req.params);
    Application.find({ userId: req.params.userId }, (err, doc) => {
        if(!err){
             res.json({data: doc, status: true});
        }else{
            res.json({status: false, data: err})
        }
    });
}
