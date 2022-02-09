import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css']
})
export class ManageAppointmentsComponent implements OnInit {
  displayBasic:boolean = false;
  appointmentData:any[]=[];
  status:string = '';

  totalRecords: any=0;
  data:any; 

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    
  //this.registrationService.getAppointmentData().subscribe((data: any) => {

    this.appointmentData =  this.registrationService.appointmentsData;
    for(var i=0;i<this.appointmentData.length;i++){
    this.appointmentData[i].status = (new Date(this.appointmentData[i].schedule_time) > new Date()) ? "Ongoing" : "Completed";
    }

    this.totalRecords = this.appointmentData.length;
   
  //});
  
  }

  popUp(){
    this.displayBasic = true;
  }
 
}
