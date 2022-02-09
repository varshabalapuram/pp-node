import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {




  
  displayBasic:boolean = false;
  patientDetails:any;
  displayDetails:boolean = false;
  data:any; 
  patientDemographic:any;
  dailyData:any
  constructor(private registrationService: RegistrationService) { 
    this.patientDemographic = {};
    this.dailyData = {
      labels: ['Number of Appointments', 'Pending Appointments'],
      datasets: [
          {
              data: [2,70],
              backgroundColor: [
                '#FFC107','#55b3c8'
                  
              ],
              hoverBackgroundColor: [
                '#FFE082',  '#a2bce6'
              ]
          }]    
      };
  }

  ngOnInit(): void 
  {
    
  this.patientDemographic = JSON.parse(sessionStorage.getItem('userData') || '');
  console.log("asfsbfashf");

  console.log(this.patientDemographic.firstname);
  
  // this.registrationService.getData().subscribe((data: any) => {
  //  this.patientDetails =  data;
  //  this.totalRecords = this.patientDetails.length;
  // });

  }
  back(){
    this.displayDetails = false;
  }

  popUp(){
     this.displayBasic =true
    this.displayDetails = true;
   // this.data =data;
  }
 
  viewDetails(details:any){
    //this.displayBasic =true
    this.patientDemographic = details;
    this.displayDetails = true;
  }

//   patientData:any;

//   status?:string;
// blood_pressure:any;
// pulse_rate:any;
// current_medication:string=""
// Events:any[] = [];
// physicianInfo: any = {};
// patientInfo: any = {};
//   constructor(
//     private registrationService: RegistrationService,

//   ) { }

//   ngOnInit(): void {
//     this.patientData = JSON.parse(sessionStorage.getItem('userData') || '');

    
//   if(this.patientData.role!='Physician')
//   {
//     this.status = (new Date(this.patientData.demographics.schedule_time) > new Date()) ? "onGoing" : "Completed";
//     this.blood_pressure=(this.patientData.demographics.bloodPressure!="") ? this.patientData.demographics.bloodPressure: "N/A"
//     this.pulse_rate=(this.patientData.demographics.pluseRate!="") ? this.patientData.demographics.pluseRate: "N/A"    

//     this.current_medication=(this.patientData.medication?.currentmedication!="") ? this.patientData.medication?.currentmedication?.split(","):"N/A"

//   }else{
//     this.registrationService.getPhysicianDataById(this.patientData.username).subscribe((data:any) =>{
//       this.physicianInfo = data;
//       this.patientInfo = data.patientsDetails
//       this.Events = [
//         {title: `Appointment with ${this.patientInfo.patient_name}`, start: `${this.patientInfo.schedule_time}`, allDay: false }
//       ]
//     });
//   }

//   }

}
