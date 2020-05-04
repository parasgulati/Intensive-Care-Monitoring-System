const mongoose=require('mongoose');
const NurseToPatient=mongoose.Schema({
    patientemail:{type:String},
    nurseemail:{type:String}
});
module.exports =mongoose.model("NurseToPatient",NurseToPatient);