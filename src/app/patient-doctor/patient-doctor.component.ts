import { Component, OnInit, getModuleFactory } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-patient-doctor',
  templateUrl: './patient-doctor.component.html',
  styleUrls: ['./patient-doctor.component.css']
})
export class PatientDoctorComponent implements OnInit {
diseases;
doc=[];
len=0;
patientemail='';
  constructor(private http:HttpClient) { }

  ngOnInit() {
this.getDoctors();
  }

  getDoctors()
  {
    let key='diseases';
    this.diseases=localStorage.getItem(key);

    const data={diseases:this.diseases};
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');

    this.http.post('http://localhost:3000/patient/get/doctor',JSON.stringify(data),{headers:headers})
    .subscribe((msg:any)=>{
      this.doc=msg;
      this.len=msg.length;
  
      var select=document.getElementsByTagName("select")[0];
      var l;
      for(l=0;l<this.len;l++)
      {
        var option=document.createElement('option');
        var val=document.createAttribute('value');
        option.innerHTML=this.doc[l].email;
        val.value=this.doc[l].email;
        option.setAttributeNode(val);
        select.appendChild(option);
      }
      var x=document.getElementById('here');
      x.appendChild(select);
    }); 
  }

  saveDoctorToPatient()
  {
    this.patientemail=localStorage.getItem('email');
    var value=(document.getElementsByTagName("select")[0] as HTMLSelectElement).value;
    const data={'patientemail':this.patientemail,'doctoremail':value}
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');

    this.http.post('http://localhost:3000/doctor/to/patient',JSON.stringify(data),{headers:headers})
    .subscribe((msg:any)=>{
    
    });
  }

}