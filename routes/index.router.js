const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jobController = require('../controllers/jobs.controller');
const applicationController = require('../controllers/application.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/login', ctrlUser.authenticate )
router.post('/register', ctrlUser.register )
router.get('/job/all', jobController.getJobs)
router.get('/job/all/:postedBy', jwtHelper.verifyJwtToken, jobController.getJobsBy)
router.post('/job/add', jwtHelper.verifyJwtToken, jobController.addJob)
router.post('/application', jwtHelper.verifyJwtToken, applicationController.addApplication)
router.get('/applications/:jobId', jwtHelper.verifyJwtToken, applicationController.getApplicants)
router.get('/applications/:jobId/:userId', jwtHelper.verifyJwtToken, applicationController.checkIfAlreadyApplied);
router.post('/download', jwtHelper.verifyJwtToken, applicationController.downloadResume)
router.get('/application/:userId',jwtHelper.verifyJwtToken, applicationController.getAllApplications)
module.exports = router;
