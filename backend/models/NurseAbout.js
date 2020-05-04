const mongoose=require('mongoose');
const NurseAbout=mongoose.Schema({
    email:{type:String},
    qualification:{type:String}
});
module.exports =mongoose.model("NurseAbout",NurseAbout);