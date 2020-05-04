const mongoose=require('mongoose');
const DoctorAbout=mongoose.Schema({
    email:{type:String},
    qualification:{type:String},
    specialization:{type:String}
});
module.exports =mongoose.model("DoctorAbout",DoctorAbout);