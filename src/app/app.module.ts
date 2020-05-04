import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Routes} from '@angular/router';
import {DoctorComponent} from 'src/app/doctor/doctor.component';
import {PatientComponent} from 'src/app/patient/patient.component';
import {NurseComponent} from 'src/app/nurse/nurse.component';
import {RouterModule} from '@angular/router';
import {DoctorAboutComponent} from 'src/app/doctor-about/doctor-about.component';
import { DoctorPatientComponent } from './doctor-patient/doctor-patient.component';
import { PatientAboutComponent } from './patient-about/patient-about.component';
import { PatientDoctorComponent } from './patient-doctor/patient-doctor.component';
import { NurseAboutComponent } from './nurse-about/nurse-about.component';
import { NurseDoctorComponent } from './nurse-doctor/nurse-doctor.component';
import { NursePatientComponent } from './nurse-patient/nurse-patient.component';
import{StorageServiceModule} from 'angular-webstorage-service';
import {LoginComponent} from 'src/app/login/login.component';
import {SignupComponent} from 'src/app/signup/signup.component';

const appRoutes:Routes=[
  {
    path:' ',
    component:AppComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'doctor',
    component:DoctorComponent,
    children:[{path:'about',component:DoctorAboutComponent},
              {path:'patient',component:DoctorPatientComponent}]
  },
  {
    path:'patient',
    component:PatientComponent,
    children:[{path:'about',component:PatientAboutComponent},
              {path:'doctor',component:PatientDoctorComponent}]

  },
  {
    path:'nurse',
    component:NurseComponent,
    children:[{path:'about',component:NurseAboutComponent},
              {path:'doctor',component:NurseDoctorComponent},
              {path:'patient',component:NursePatientComponent}]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    PatientComponent,
    NurseComponent,
    DoctorAboutComponent,
    DoctorPatientComponent,
    PatientAboutComponent,
    PatientDoctorComponent,
    NurseAboutComponent,
    NurseDoctorComponent,
    NursePatientComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [HttpClientModule,
    BrowserModule,
    StorageServiceModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
