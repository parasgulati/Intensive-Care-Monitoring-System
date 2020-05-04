const mongoose=require('mongoose');
const PatientAbout=mongoose.Schema({
    email:{type:String},
    bloodgroup:{type:String},
    diseases:{type:String}
});
module.exports =mongoose.model("PatientAbout",PatientAbout);