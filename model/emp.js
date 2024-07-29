const mongoose = require("mongoose");

const empSchema = mongoose.Schema({
    admin : {
        type : mongoose.Schema.Types.ObjectId
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        type : Number,
        required : true
    },
    designation : {
        type : String,
        enum :["HR","Manager","Sales"],
        default : "HR",
        required : false
    },
    gender : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    coverImage : {
        type : String,
        required : false
    }
},{timestamps : true});

const emp = mongoose.model('emp', empSchema );

module.exports = emp
