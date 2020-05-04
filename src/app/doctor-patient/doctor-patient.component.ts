import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-doctor-patient',
  templateUrl: './doctor-patient.component.html',
  styleUrls: ['./doctor-patient.component.css']
})
export class DoctorPatientComponent implements OnInit {
email='';
doc=[];
len=0;
doc1=[];
len1=0;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.loadPatients();
  }
  loadPatients()
  {
    this.email=localStorage.getItem('email');
    const data={'doctoremail':this.email};
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');

    this.http.post('http://localhost:3000/get/doctor/to/patient',JSON.stringify(data),{headers:headers})
    .subscribe((msg:any)=>{
      this.doc1=msg;
      this.len1=msg.length;

      this.http.post('http://localhost:3000/get/NursesAllDetails',{headers:headers})
    .subscribe((msg:any)=>{
      this.doc=msg;
      this.len=msg.length;
    

      var i;
      var x=document.getElementById("patient_to_nurse");
      for(i=0;i<this.len1;i++)
      {
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        var td2=document.createElement("td");
        var td3=document.createElement("td");
        var sel=document.createElement("select");
        td1.innerHTML=this.doc1[i].patientemail;  
        var j;          
            for(j=0;j<this.len;j++)
            {
              var op=document.createElement("option");
              var at=document.createAttribute("value");
              at.value=this.doc[j];
              op.innerHTML=this.doc[j].email;
              
              op.setAttributeNode(at);
              sel.appendChild(op); 
            }
      
      var input=document.createElement("input");
      var typ=document.createAttribute("type");
      typ.value="checkbox";
      var val=document.createAttribute("value");
      val.value=i;
      input.setAttributeNode(typ);
      input.setAttributeNode(val);
      td3.appendChild(input);
      tr.appendChild(td1);
      td2.appendChild(sel);
      tr.appendChild(td2);
      tr.append(td3);
    x.append(tr);
  } 
});
 });
  }
  savePatientToNurse()
  {

    var i;
  for(i=0;i<this.len1;i++)
  {
    var w=document.getElementsByTagName("input")[0];

    if(w.checked==true)
    {
      
        var t=document.getElementsByTagName("tr")[i+1];
        var p=t.getElementsByTagName("td")[0].innerHTML;
        var n=t.getElementsByTagName("td")[1].innerHTML;
        alert(p);
        alert(n);
    }
  }
  }

    
  
  
}
