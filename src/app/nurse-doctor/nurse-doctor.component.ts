import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-nurse-doctor',
  templateUrl: './nurse-doctor.component.html',
  styleUrls: ['./nurse-doctor.component.css']
})
export class NurseDoctorComponent implements OnInit {
  doc1=[];
  doc2=[];
  len1=0;
  len2=0;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getDetailsOfDoctor();
  }
  getDetailsOfDoctor()
  {
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('http://localhost:3000/nurse/doctor/info',{},{headers:headers})
    .subscribe((msg:any)=>{
      this.doc1=msg;
      this.len1=msg.length;

      this.http.post('http://localhost:3000/nurse/doctor/about',{},{headers:headers})
      .subscribe((msg:any)=>{
      this.doc2=msg;
      this.len2=msg.length;
        var i,j;
        for(i=0;i<this.len1;i++)
        {
          for(j=0;j<this.len2;j++)
          {
            if(this.doc1[i].email==this.doc2[j].email)
            {
              var tr=document.createElement('tr');
              var td1=document.createElement('td');
              td1.innerHTML='<span style="font-size:15px">'+this.doc1[i].name+"</span>";
              var td2=document.createElement('td');
              td2.innerHTML='<span style="font-size:15px">'+this.doc2[j].qualification+"</span>";
              var td3=document.createElement('td');
              td3.innerHTML='<span style="font-size:15px">'+this.doc2[j].specialization+"</span>";
              var td4=document.createElement('td');
              td4.innerHTML='<span style="font-size:15px">'+this.doc1[i].mobnumber+"</span>";
              var td5=document.createElement('td');
              td5.innerHTML='<span style="font-size:15px">'+this.doc1[i].email+"</span>";
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              var x=document.getElementById('doctor_table');
              x.appendChild(tr);
            }
          }
        }
      });
    });
  }

}
