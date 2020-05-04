const mongoose=require('mongoose');
const Post=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    category:{type:String},
    mobnumber:{type:String}
});
module.exports =mongoose.model("Post",Post);