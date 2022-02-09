import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  aptDetails:any[] = [
    // {pid:"1", pname:"John Marsh", date:"27/11/2021", type:"Routine Visit", status:"Ongoing"},
    // {pid:"2", pname:"Shaun Mark", date:"25/11/2021", type:"Root Canal", status:"Completed"},
    // {pid:"3", pname:"Bret Lee", date:"24/11/2021", type:"Routine Visit", status:"Ongoing"},
    // {pid:"4", pname:"Amol Gupta", date:"27/11/2021", type:"Diabetes", status:"Ongoing"},
    // {pid:"5", pname:"Vishwa Karma", date:"26/11/2021", type:"Viral", status:"Postponed"},
    // {pid:"6", pname:"Bretany Lee", date:"28/11/2021", type:"Diabetes", status:"Due"},
    // {pid:"7", pname:"Samantha Woods", date:"24/11/2021", type:"Fracture", status:"Completed"}

  ];

  userDetail: any;

  constructor( private registrationService: RegistrationService) { }

  ngOnInit(): void {

    this.userDetail = JSON.parse(sessionStorage.getItem('userData') || '');
      this.registrationService.getPhysicianDataById(this.userDetail.username).subscribe((data:any) =>{
        this.aptDetails = data.patientsDetails;
        for(var i=0;i<this.aptDetails.length;i++){
          this.aptDetails[i].status = (new Date(this.aptDetails[i].schedule_time) > new Date()) ? "Ongoing" : "Completed";  
        console.log(this.aptDetails)}
      });





  }

  

}
