import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  secure_email='';
  secure_password='';
  
  ngOnInit() {
  }

  verify_login()
  {
    var data1={
      email:this.secure_email,
      password:this.secure_password
    }
    let key='email';
    localStorage.setItem(key,data1.email);
  
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

    this.http.post("http://localhost:3000/login",JSON.stringify(data1),{headers:headers})
    .subscribe((msg)=> {
      if(msg['message']=='no')
      {
        document.getElementById("err_msg").innerHTML="<font color='red'>Email does not exists</font>";
      }
      else
      {
        if(msg['message']=='wrong')
        {
          document.getElementById("err_msg").innerHTML="<font color='red'>wrong password</font>";
        }
        else
        {
          if(msg['message']=='ok')
          {
            document.getElementsByClassName("sidenav")[0].style='border:0px solid black;';
            document.getElementsByClassName("login")[0].style='display:none;';

            if(msg['category']=='D')
            {
              this.router.navigate(['/doctor']);
            }
            else
            {
              if(msg['category']=='P')
              {
                this.router.navigate(['/patient']);
              }
              else
              {
                if(msg['category']=='N')
                {
                  this.router.navigate(['/nurse']);
                }
              }
            }
          }
        }
      }
    });
  }
}
