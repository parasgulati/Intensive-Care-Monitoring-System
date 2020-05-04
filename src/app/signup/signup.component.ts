import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name='';
  mail='';
  pass='';
  cat='';
  mob='';
  constructor(private http:HttpClient,private router:Router){}

  ngOnInit() {
  }
  create_login() {
  
    var data={
        name:this.name,
        email:this.mail,
        password:this.pass,
        category:this.cat,
        mobnumber:this.mob
        };
      
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    this.http.post("http://localhost:3000/signup",JSON.stringify(data),{headers:headers})
    .subscribe((msg)=> {
        if(msg['message']=='exists')
        {
          document.getElementsByClassName('email')[0].style="border:2px solid red";       
          document.getElementById("message").innerHTML="<font color='red'>E-mail already exists</font>";  
        }
        else
        {
          document.getElementsByClassName('email')[0].style="border:2px solid green"; 
          document.getElementById("message").innerHTML="<font color='green'>Account is Successfuly created</font>";
        }
      });
    }

}
