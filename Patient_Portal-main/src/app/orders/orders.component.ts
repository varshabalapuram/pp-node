import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  userDetails: any;
  appointments: any;
  physicians: any[] = [];
  physicianData: any[] = [];
  del:any=[];
  allAppointmentsData:any[]=[];


  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userData') || '');
    this.appointments = this.userDetails.sceduledAppointments;


    for (var i = 0; i < this.appointments.length; i++) {

      if (this.appointments[i].physicianName) {
        this.physicians.push(this.appointments[i].physicianName);
      }
    }


    this.getOrders();
  }

  getOrders() {
    this.registrationService.getPhysicianData().subscribe((data: any) => {
      this.physicianData = data
      console.log(this.physicianData);
      this.physicianData.forEach((element,i) => {
        if(element.patientsDetails.find((item: any) => (item.username == this.userDetails.username)) != undefined && element.patientsDetails.find((item: any) => (item.username == this.userDetails.username)) != '' )
        {
          
          console.log(element.username);
          element.patientsDetails.forEach((element1:any) => {
            element1.physicianName = element.username;
          });
          this.allAppointmentsData.push(element.patientsDetails.find((item: any) => (item.username == this.userDetails.username)));
         
        }

        
      });
      console.log( this.allAppointmentsData);

    })
  }

}
