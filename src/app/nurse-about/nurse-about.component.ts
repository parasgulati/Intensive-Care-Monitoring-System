import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-nurse-about',
  templateUrl: './nurse-about.component.html',
  styleUrls: ['./nurse-about.component.css']
})
export class NurseAboutComponent implements OnInit {
email='';
name='';
mobnumber='';
qualification='';
  
constructor(private http:HttpClient) { }

  ngOnInit() {
    this.initialize();
  }

  initialize()
  {
    this.email=localStorage.getItem('email');
    this.name=localStorage.getItem('name');
    this.mobnumber=localStorage.getItem('mobnumber');
    this.getNurseDetails();  
  }

  getNurseDetails()
  {
    (document.getElementById("nurse_n") as HTMLInputElement).value=this.name;
    (document.getElementById("nurse_mobnumber") as HTMLInputElement).value=this.mobnumber;
    (document.getElementById("nurse_qualification") as HTMLInputElement).value=this.qualification; 

    const data={email:this.email}
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('http://localhost:3000/nurse/about',JSON.stringify(data),{headers:headers})
    .subscribe(msg=>{
      this.qualification=msg['qualification'];
    });
  }
  saveNurseDetails()
  {
    this.name=(document.getElementById("nurse_n") as HTMLInputElement).value;
    this.mobnumber=(document.getElementById("nurse_mobnumber") as HTMLInputElement).value;
    this.qualification=(document.getElementById("nurse_qualification") as HTMLInputElement).value; 
    
    const data1={email:this.email,
      qualification:this.qualification};

    const data2={
      name:this.name,
      email:this.email,
      mobnumber:this.mobnumber
      }
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    
    this.http.post('http://localhost:3000/nurse/about/update',JSON.stringify(data1),{headers:headers})
    .subscribe(msg=>{
      console.log('details nurse.about updated successfully');
    });

    this.http.post('http://localhost:3000/details/update',JSON.stringify(data2),{headers:headers})
    .subscribe(msg=>{
      console.log('details doctor updated successfully');
    });

  }
  editNurseDetails()
  {
    document.getElementById("nurse_details_edit_form").style="display:inline;";
  }
}
