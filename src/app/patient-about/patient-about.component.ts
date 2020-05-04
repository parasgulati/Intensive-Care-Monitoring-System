import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-patient-about',
  templateUrl: './patient-about.component.html',
  styleUrls: ['./patient-about.component.css']
})
export class PatientAboutComponent implements OnInit {
  email='';
  name='';
  mobnumber='';
  bloodgroup='';
  diseases='';
  
    constructor(private http:HttpClient) { }
  
    ngOnInit() {
      this.initialize();
    }
    initialize()
    {
      this.email=localStorage.getItem('email');
      this.name=localStorage.getItem('name');
      this.mobnumber=localStorage.getItem('mobnumber');
      this.getPatientDetails();  
    }
  
    getPatientDetails()
    {
      const data={email:this.email}
      const headers=new HttpHeaders()
      .set('Authorization','my-auth-token')
      .set('Content-Type','application/json');

      this.http.post('http://localhost:3000/patient/about',JSON.stringify(data),{headers:headers})
      .subscribe((msg:any)=>{
        this.bloodgroup =msg['bloodgroup'];
        this.diseases=msg['diseases'];   
        let key='diseases';
        localStorage.setItem(key,this.diseases);
         
      (document.getElementById("patient_n") as HTMLInputElement).value=this.name;
      (document.getElementById("patient_mobnumber") as HTMLInputElement).value=this.mobnumber;
      (document.getElementById("patient_bloodgroup") as HTMLInputElement).value=this.bloodgroup; 
      (document.getElementById("patient_diseases") as HTMLInputElement).value=this.diseases;
      });
     
    }
    savePatientDetails()
    {
      this.name=(document.getElementById("patient_n") as HTMLInputElement).value;
      this.mobnumber=(document.getElementById("patient_mobnumber") as HTMLInputElement).value;
      this.bloodgroup=(document.getElementById("patient_bloodgroup") as HTMLInputElement).value; 
      this.diseases=(document.getElementById("patient_diseases") as HTMLInputElement).value;
    
      const data1={email:this.email,
        bloodgroup:this.bloodgroup,
        diseases:this.diseases};
  
      const data2={
        name:this.name,
        email:this.email,
        mobnumber:this.mobnumber
        }
      const headers=new HttpHeaders()
      .set('Authorization','my-auth-token')
      .set('Content-Type','application/json');
      
      this.http.post('http://localhost:3000/patient/about/update',JSON.stringify(data1),{headers:headers})
      .subscribe(msg=>{
        console.log('details patient.about updated successfully');
      });
  
      this.http.post('http://localhost:3000/details/update',JSON.stringify(data2),{headers:headers})
      .subscribe(msg=>{
        console.log('details doctor updated successfully');
      });
  
    }
    editPatientDetails()
    {
      document.getElementById("patient_details_edit_form").style="display:inline;";
    }
  
}
