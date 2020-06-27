const mongoose = require('mongoose');

const blogInfoSchema = mongoose.Schema({
    title:{
        type : String
    },
    description : {
        type : String
    },
    image:{
        data : Buffer,
        contentType : String
    }
},{timestamps : true});

module.exports = mongoose.model('blog',blogInfoSchema);