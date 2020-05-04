import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-doctor-about',
  templateUrl: './doctor-about.component.html',
  styleUrls: ['./doctor-about.component.css']
})
export class DoctorAboutComponent implements OnInit {
email='';
name='';
mobnumber='';
qualification='';
specialization='';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.initialize();
  }
  initialize()
  {
    this.email=localStorage.getItem('email');
    this.name=localStorage.getItem('name');
    this.mobnumber=localStorage.getItem('mobnumber');
    this.getDoctorDetails();  
  }

  getDoctorDetails()
  {

    const data={email:this.email}
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('http://localhost:3000/doctor/about',JSON.stringify(data),{headers:headers})
    .subscribe(msg=>{
      this.qualification=msg['qualification'];
      this.specialization=msg['specialization'];   

    (document.getElementById("doctor_n") as HTMLInputElement).value=this.name;
    (document.getElementById("doctor_mobnumber") as HTMLInputElement).value=this.mobnumber;
    (document.getElementById("doctor_qualification") as HTMLInputElement).value=this.qualification; 
    (document.getElementById("doctor_specialization") as HTMLInputElement).value=this.specialization;
    });
  }
  saveDoctorDetails()
  {
    this.name=(document.getElementById("doctor_n") as HTMLInputElement).value;
    this.mobnumber=(document.getElementById("doctor_mobnumber") as HTMLInputElement).value;
    this.qualification=(document.getElementById("doctor_qualification") as HTMLInputElement).value; 
    this.specialization=(document.getElementById("doctor_specialization") as HTMLInputElement).value;
  
    const data1={email:this.email,
      qualification:this.qualification,
      specialization:this.specialization};

    const data2={
      name:this.name,
      email:this.email,
      mobnumber:this.mobnumber
      }
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    
    this.http.post('http://localhost:3000/doctor/about/update',JSON.stringify(data1),{headers:headers})
    .subscribe(msg=>{
      console.log('details doctor.about updated successfully');
    });

    this.http.post('http://localhost:3000/details/update',JSON.stringify(data2),{headers:headers})
    .subscribe(msg=>{
      console.log('details doctor updated successfully');
    });

  }
  editDoctorDetails()
  {
    document.getElementById("doctor_details_edit_form").style="display:inline;";
  }
}
