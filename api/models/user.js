const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type : 'String',
        required: true,
        unique: true,
    },
    password : {
        type: "string",
        required: true,
        unique: true,
    },
    
    token : {
        type : String,
        required : true
     }
})
    

const usermodel = new mongoose.model("user", userSchema);

  module.exports = usermodel;