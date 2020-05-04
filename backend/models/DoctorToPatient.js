const mongoose=require('mongoose');
const DoctorToPatient=mongoose.Schema({
    patientemail:{type:String},
    doctoremail:{type:String}
});
module.exports =mongoose.model("DoctorToPatient",DoctorToPatient);