import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-patient-apt-history',
  templateUrl: './patient-apt-history.component.html',
  styleUrls: ['./patient-apt-history.component.css']
})
export class PatientAptHistoryComponent implements OnInit {

  userDetails:any;
  appointments: any [] = [];
  physicians:any[] = [];
  physicianData:any[] = [];

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userData') || '');
    this.appointments = this.userDetails.sceduledAppointments;

    for(var i=0;i<this.appointments.length;i++){
      
      if(this.appointments[i].physicianName){
        this.physicians.push(this.appointments[i].physicianName);
      }
    }

  }

  // getOrders(dateAndTime:any){
  //   this.registrationService.getPhysicianData().subscribe((data:any)=>
  //   {
  //     this.physicianData = data
  //   })
  // }

  
}
