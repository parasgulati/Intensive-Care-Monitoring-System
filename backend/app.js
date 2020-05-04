const express=require('express')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();
const DoctorAbout=require("C:/Windows/System32/hospital/backend/models/DoctorAbout");
const NurseAbout=require("C:/Windows/System32/hospital/backend/models/NurseAbout");
const Post=require("C:/Windows/System32/hospital/backend/models/Post");
const PatientAbout=require("C:/Windows/System32/hospital/backend/models/PatientAbout");
const NurseToPatient=require("C:/Windows/System32/hospital/backend/models/NurseToPatient");
const DoctorToPatient=require("C:/Windows/System32/hospital/backend/models/DoctorToPatient");

mongoose.connect('mongodb+srv://paras:paras@hospital-nbnbp.mongodb.net/test?retryWrites=true&w=majority')
.then(()=>{
    console.log('mongo db connected');
})
.catch(()=>{
    console.log('error caught');
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/login',(req,res)=>{ 
    console.log('login successfully executed');
    var post2=req.body;
    var x=Post.findOne({"email":post2.email},{name:1,email:1,password:1,category:1,mobnumber:1},
        function(err,data)
        {
            if(err)
                console.log("error occured");
            else
            {
                if(data==null)
                {
                    console.log('email does not exists');
                    res.status(200).json({       
                        message:'no'   
                    });
                    res.send();
                }
                else
                {
                   if(post2.password==data.password)
                   {
                        console.log('ok matches');
                        res.status(200).json({
                            message:'ok',
                            name:data.name,
                            email:data.email,
                            category:data.category,
                            mobnumber:data.mobnumber
                        });
                        res.send();
                    }
                    else
                    {
                        console.log('password does not match');
                        res.status(200).json({
                            message:'wrong'
                            })
                        res.send();
                    }
                }
            }
        });
    });     
    
app.post('/signup',(req,res,next)=>{ 
    console.log('signup successfully executed');       
    var post2=req.body;
    const post=new Post({
        name:post2.name,
        email:post2.email,
        password:post2.password,
        category:post2.category,
        mobnumber:post2.mobnumber             
        }); 
    var x=Post.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        if(data==null)
        {
            post.save();
            res.status(200).json({       
                message:'created'   
            });
            res.send();
        }
        else
        {
            res.status(200).json({
                message:'exists'    
            });
            res.send();
        }
    }
    });
    
        });

app.post('/details',(req,res,next)=>{ 
    console.log('doctor details successfully executed');
    var post2=req.body;
    var x=Post.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        res.status(200).json({
            name:data.name,
            mobnumber:data.mobnumber    
        });
        res.send();    
    }
    });
});

app.post('/doctor/about',(req,res,next)=>{ 
    var post2=req.body;
    var x=DoctorAbout.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        if(data==null)
        {
            res.status(200).json({
                qualification:'',
                specialization:''
            });
            res.send();
        }
        else
        {
            res.status(200).json({
                qualification:data.qualification,
                specialization:data.specialization    
            });
            res.send();
        }    
    }
    });
});

app.post('/doctor/about/update',(req,res,next)=>{ 
    var post2=req.body;
    DoctorAbout.deleteOne({"email":post2.email},function(err,data){
        if(err)
        {
            console.log('error occured while deleting');
        }
        else
        {
            console.log('deleted successfully');
          const doctor_about=new DoctorAbout({
                    email:post2.email,
                    qualification:post2.qualification,
                    specialization:post2.specialization
                    });
                    doctor_about.save();
                    console.log('updated successfully');
                     res.status(200).json({
                        message:'updated'
                        });
        }
        });
       
    });
     
app.post('/details/update',(req,res,next)=>{ 
    var post2=req.body;
    var x=Post.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        var password=data.password;
        var category=data.category;
        Post.deleteOne({'email':post2.email},function(err,data){
        if(err)
        {
            console.log('error occured while deleting');
        }
        else
        {
            console.log('deleted successfully');
        }
        });
        const post=new Post({
            name:post2.name,
            email:post2.email,
            password:password,
            category:category,
            mobnumber:post2.mobnumber             
            });
        post.save();
        res.status(200).json({
            message:'updated'    
            }); 
        res.send(); 
    }
    }); 
});

app.post('/nurse/about',(req,res,next)=>{ 
    var post2=req.body;
    var x=NurseAbout.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        if(data==null)
        {
            res.status(200).json({
                qualification:'',
                specialization:''
            });
            res.send();
        }
        else
        {
            res.status(200).json({
                qualification:data.qualification,
                specialization:data.specialization    
            });
            res.send();
        }    
    }
    });
});

app.post('/nurse/about/update',(req,res,next)=>{ 
    var post2=req.body;
    NurseAbout.deleteOne({"email":post2.email},function(err,data){
        if(err)
        {
            console.log('error occured while deleting');
        }
        else
        {
            console.log('deleted successfully');
        }
        });
        
    const nurse_about=new NurseAbout({
        email:post2.email,
        qualification:post2.qualification
        });
    nurse_about.save();
    console.log('updated successfully');
    res.status(200).json({
        message:'updated'
        });
    });
   
    
app.post('/patient/about',(req,res,next)=>{ 
    var post2=req.body;
    var x=PatientAbout.findOne({'email':post2.email},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        if(data==null)
        {
            res.status(200).json({
                bloodgroup:'',
                diseases:''
            });
            res.send();
        }
        else
        {
            res.status(200).json({
                bloodgroup:data.bloodgroup,
                diseases:data.diseases    
            });
            res.send();
        }    
    }
    });
});
app.post('/patient/about/update',(req,res,next)=>{ 
    var post2=req.body;
    PatientAbout.deleteOne({"email":post2.email},function(err,data){
        if(err)
        {
            console.log('error occured while deleting');
        }
        else
        {
            console.log('deleted successfully');
        
    const patient_about=new PatientAbout({
        email:post2.email,
        bloodgroup:post2.bloodgroup,
        diseases:post2.diseases
        });
    patient_about.save();
    console.log('updated successfully');
    res.status(200).json({
        message:'updated'
        });
    }
});

    });

app.post('/nurse/doctor/info',(req,res,next)=>{
    Post.find({'category':'D'},function(err,data){
   if(err)
   {
       console.log('error occured');
   }     
   else
   {
    console.log('nurses');
       res.send(data);
   }
    })
})


app.post('/nurse/doctor/about',(req,res,next)=>{
    DoctorAbout.find({},function(err,data){
   if(err)
   {
       console.log('error occured');
   }     
   else
   {
       res.send(data);
   }
    })
});


app.post('/nurse/patient/info',(req,res,next)=>{
    Post.find({'category':'P'},function(err,data){
   if(err)
   {
       console.log('error occured');
   }     
   else
   {
       res.send(data);
   }
    })
});

app.post('/nurse/patient/details',(req,res,next)=>{
    PatientAbout.find({},function(err,data){
   if(err)
   {
       console.log('error occured');
   }     
   else
   {
       res.send(data);
   }
    })
});

app.post('/nurse/watch/patient',(req,res,next)=>{
    NurseToPatient.find({},function(err,data){
   if(err)
   {
       console.log('error occured');
   }     
   else
   {
       res.send(data);
   }
    })
});
app.post('/nurse/to/patient',(req,res,next)=>{
    var post=req.body;
    console.log(post.patientemail);
    var da=new NurseToPatient({
        patientemail:post.patientemail,
        nurseemail:post.nurseemail
    });
    da.save();
    res.send();
});

app.post('/doctor/to/patient',(req,res,next)=>{
    var post=req.body;
    console.log('doctor to patient');
                var dtp=new DoctorToPatient({
                    patientemail:post.patientemail,
                    doctoremail:post.doctoremail
                })
                dtp.save();
    res.send()
});    

app.post('/get/doctor/to/patient',(req,res,next)=>{ 
    var post2=req.body;
    var x=DoctorToPatient.find({'doctoremail':post2.doctoremail},{'patientemail':1},function(err,data){
                if(err)
                {
                    console.log("error occured");
                }
                else
                {
                    
                    res.send(data);
                }
                });
            });
            
app.post('/patient/get/doctor',(req,res,next)=>{ 
    var post2=req.body;
    var x=DoctorAbout.find({'specialization':post2.diseases},{'email':1},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        if(data==null)
            res.send({});
        else
            res.send(data);
    }
    });
});

app.post('/get/NursesAllDetails',(req,res,next)=>{ 
    console.log('doctor details successfully executed');
    
    var x=Post.find({'category':'N'},function(err,data){
    if(err)
    {
        console.log("error occured");
    }
    else
    {
        res.send(data);    
    }
    });
});


module.exports=app;
   
    