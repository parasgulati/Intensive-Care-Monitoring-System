import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-nurse-patient',
  templateUrl: './nurse-patient.component.html',
  styleUrls: ['./nurse-patient.component.css']
})
export class NursePatientComponent implements OnInit {
doc1=[];
doc2=[];
doc3=[];
doc4=[];
doc5=[];
doc6=[];
len1=0;
len2=0;
len3=0;
len4=0;
len5=0;
len6=0;
nurse='';
doctor='';

  constructor(private http:HttpClient) { }

  ngOnInit() {
    
  }
  getDetailsOfPatient()
  {
    const headers=new HttpHeaders()
    .set('Authorization','my-auth-token')
    .set('Content-Type','application/json');
    this.http.post('http://localhost:3000/nurse/patient/info',{},{headers:headers})  
    .subscribe((msg:any)=>{
      this.doc1=msg;
      this.len1=msg.length;

      this.http.post('http://localhost:3000/nurse/patient/details',{},{headers:headers}) 
      .subscribe((msg:any)=>{
      this.doc2=msg;
      this.len2=msg.length;
      
      this.http.post('http://localhost:3000/nurse/watch/patient',{},{headers:headers})
      .subscribe((msg:any)=>{
        this.doc3=msg;
        this.len3=msg.length;
      
      this.http.post('http://localhost:3000/doctor/watch/patient',{},{headers:headers})
      .subscribe((msg:any)=>{
        this.doc4=msg;
        this.len4=msg.length;
       
              var i,j,k,m;
              for(i=0;i<this.len1;i++)
              {
                for(j=0;j<this.len2;j++)
                {
                  if(this.doc1[i].email==this.doc2[j].email)
                  {
                    for(k=0;k<this.len3;k++)
                    {
                      if(this.doc1[i].email==this.doc3[k].patientemail)
                      {
                        this.nurse=this.doc3[k].nurseemail;
                      }
                    }
                    for(m=0;m<this.len4;m++)
                    {
                      if(this.doc1[i].email==this.doc4[m].patientemail)
                      {
                        this.doctor=this.doc4[m].doctoremail;
                      }
                    }
                    this.http.post('http://localhost:3000/all/doctor',{},{headers:headers})
                    .subscribe((msg:any)=>{
                    this.doc5=msg;
                    this.len5=msg.length;
                   
                   this.http.post('http://localhost:3000/all/nurse',{},{headers:headers})
                   .subscribe((msg:any)=>{
                    this.doc6=msg;
                    this.len6=msg.length;
              var l,g;
              var selectdoctor=document.createElement('select');
              var option0doctor=document.createElement('option');
              var val0doctor=document.createAttribute('value');
              val0doctor.value='NS';
              option0doctor.innerHTML='Not Selected';
              option0doctor.setAttributeNode(val0doctor);
              selectdoctor.appendChild(option0doctor);
  
              for(l=0;l<this.len5;l++)
              {
                var optiondoctor=document.createElement('option');
                var valdoctor=document.createAttribute('value');
                optiondoctor.innerHTML=this.doc5[l].email;
                valdoctor.value=this.doc5[l].email;
                if(this.doctor==this.doc5[l].email)
                {
                  var attdoctor=document.createAttribute('selected');
                  optiondoctor.setAttributeNode(attdoctor);
                }
                optiondoctor.setAttributeNode(valdoctor);
                selectdoctor.appendChild(optiondoctor);
              }

              var selectnurse=document.createElement('select')
              var option0nurse=document.createElement('option');
              var val0nurse=document.createAttribute('value');
              val0nurse.value='NS';
              option0nurse.innerHTML='Not Selected';
              option0nurse.setAttributeNode(val0nurse);
              selectnurse.appendChild(option0nurse);
  
              for(g=0;g<this.len6;l++)
              {
                var optionnurse=document.createElement('option');
                var valnurse=document.createAttribute('value');
                optionnurse.innerHTML=this.doc6[g].email;
                valnurse.value=this.doc6[g].email;
                if(this.nurse==this.doc6[g].email)
                {
                  var attnurse=document.createAttribute('selected');
                  optionnurse.setAttributeNode(attnurse);
                }
                optionnurse.setAttributeNode(valnurse);
                selectnurse.appendChild(optionnurse);
              }

              var tr=document.createElement('tr');
              var td1=document.createElement('td');
              td1.innerHTML='<span style="font-size:15px">'+this.doc1[i].name+"</span>";
              var td2=document.createElement('td');
              td2.innerHTML='<span style="font-size:15px">'+this.doc2[j].bloodgroup+"</span>";
              var td3=document.createElement('td');
              td3.innerHTML='<span style="font-size:15px">'+this.doc2[j].diseases+"</span>";
              var td4=document.createElement('td');
              td4.innerHTML='<span style="font-size:15px">'+this.doc1[i].mobnumber+"</span>";
              var td5=document.createElement('td');
              td5.innerHTML='<span style="font-size:15px">'+this.doc1[i].email+"</span>";
              var td6=document.createElement('td');
              td6.appendChild(selectnurse);
              var td7=document.createElement('td');
              td7.appendChild(selectdoctor);

              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);
              
              var x=document.getElementById('patient_table');
              x.appendChild(tr);
            });
          });      
            }
          }
        }
       });
        });
      });        
      });
      
      
    
  }
}
