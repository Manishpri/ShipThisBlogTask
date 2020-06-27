const mongoose = require('mongoose');

const userInfoSchema = mongoose.Schema({
    userName:{
        type : String
    },
    pass : {
        type:String
    },
    dateOfBirth:{
        type :Date
    }
},{timestamps:true});
module.exports = mongoose.model('user',userInfoSchema);