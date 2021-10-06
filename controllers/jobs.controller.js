const mongoose = require('mongoose');


const Job = mongoose.model('jobs');
const Application = mongoose.model('Application');

module.exports.addJob = (req,res,next) => {
    console.log(req.body)
    var job = new Job();
    job.code = req.body.code;
    job.companyName = req.body.companyName;
    job.jobDescription = req.body.jobDescription;
    job.minSalary = req.body.minSalary;
    job.role = req.body.role;
    job.postedBy = req.body.postedBy

    job.save((err,docs)=>{
        if(!err){
            res.json({"status": true, "data": docs})
        }else{
            console.log(err)
            res.json({"status": false, "data": "something error occured"})
        }
    });
}

module.exports.getJobSeekers = (req,res,next) => {
    var id = req.body._id;
    Application.find({jobId: id},(err,docs)=>{
        if(!err){
            res.json(docs)
        }else{
            res.json(err)
        }
    })
}

module.exports.getJobs = (req,res,next) => {
    Job.find({}, (err,docs)=>{
        if(!err) res.json(docs)
        else console.log(err);
    });
}

module.exports.getJobsBy = (req,res,next) => {
    Job.find({postedBy: req.params.postedBy}, (err,docs)=>{
        if(!err) res.json(docs)
        else console.log(err);
    });
}