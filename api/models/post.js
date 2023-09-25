const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  
   title: String  ,
   summary: String,
   author:String,
   cover:  String,
   content: String,
},{
    timestamps: true,
});
  
   const postmodel = new mongoose.model("post", postSchema);

   module.exports = postmodel;