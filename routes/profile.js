const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const Colleges = require("../../models/colleges");
const Profile = require('../../models/profile');
const Projects = require('../../models/projects');
let Internships = require('../../models/internship');
const Skills = require('../../models/skills');
const PersonalInfo = require('../../models/personalinfo');
const Profile = require("../../models/profile");
const Data = require('../../models/data');

router.post("/register", (req, res) => {    
});

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    Profile.findOne({userid:id}).then(profile=>{
        res.status(200).send(profile);
    });
});

router.post('/profile/internships/:id',(req,res)=>{
    Internships.find({userid:req.body.id},async(err,internship)=>{
        if(!err){
            if(internship.length>0){
                let internship = new Internships();
                
            }
        }else{
            res.status(200).send(err);
        }
    })
});

router.post('/profile/projects/:id',(req,res)=>{
    Projects.find({userid:req.body.id},async(err,projects)=>{
        if(!err){
            if(projects.length>0){
                let projects = new Projects();
                

            }
        }else{
            res.status(200).send(err);
        }
    })
});

router.post('/profile/skills/:id',(req,res)=>{
    
    Skills.find({name:req.body.skillname},async(err,skillset)=>{
        if(!err){
            if(skillset.length>0){
            Data.findOne({id:req.body.id},async(err,user)=>{
                if(!err){
                    if(user.length>0){
                        user.skills.push(skillset.id);
                        user.save();
                        res.status(200).send(user);
                    }
                    else{
                        res.status(200).send({
                            message:"no user exists with this id"
                        });
                    }
                }
            });
            }
            else{
                let skill = new Skills();
                skill.name=req.body.skillname;
                skill.save();
                res.status(200).send({
                    message:"Added successfully"
                });
            }
        }else{
            res.status(200).send(err);
        }
    })
});

router.post('/profile/personalinfo/:id',(req,res)=>{
    PersonalInfo.find({userid:req.body.id},async(err,personalinfo)=>{
        if(!err){
            if(personalinfo.length>0){
                let personalinfo = new PersonalInfo();
                

            }
        }else{
            res.status(200).send(err);
        }
    })
});

router.post('/profile/update/skills/:id',(req,res)=>{
    Skills.find({userid:req.body.id},async(err,skillset)=>{
        if(!err){
            if(skillset.length>0){
                let skillset = new Skills();
                

            }
        }else{
            res.status(200).send(err);
        }
    })
});

module.exports = router;