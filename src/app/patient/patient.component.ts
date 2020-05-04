import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  email='';
  name='';
  mobnumber='';
  
    constructor(private http:HttpClient) { }
  
    ngOnInit() {
      let key='email';
      this.email=localStorage.getItem(key);
      this.getDetailsOfPatient();
    }
  
    getDetailsOfPatient()
    {
      var data={email:this.email};
      
      const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
  
      this.http.post("http://localhost:3000/details",JSON.stringify(data),{headers:headers})
      .subscribe((msg)=> {
        this.name=msg['name'];
        this.mobnumber=msg['mobnumber'];
        let key1='name';
        localStorage.setItem(key1,this.name);
        let key2='mobnumber';
        localStorage.setItem(key2,this.mobnumber);   
      });
    }
  
}
