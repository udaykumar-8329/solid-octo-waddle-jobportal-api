const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Job Schema
const jobSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    minSalary: {
        type: Number,
        required: true
    },
    jobDescription:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        required: true
    }

});
module.exports = User = mongoose.model("jobs", jobSchema);