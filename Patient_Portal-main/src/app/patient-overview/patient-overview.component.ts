import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsDetails } from '../app.model';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {

  userDetail:any;
  patient_name:any;
  patientData:PatientsDetails;
  patient_time:string='';
status?:string;
blood_pressure:any;
pulse_rate:any;
current_medication:string=""
disable_visit:boolean=false;
  // "age": "24",
  // "bloodPressure": "54",
  // "pluseRate": "45",
  // "ethnicity": "Indian",
  // "education": "B.tech",
  // "employment": "Software",
  // "address": "Hyderabad,KPhb",
  // "phoneNo": "9876543211",
  // "medHistory": "Nothing",
  // "surgeries": "Nothing",
  // "familyMedHistory": "Nothing",
  // "provider": "Erie",
  // "gender": "male",
  // "username": "vishwanthk"
  constructor(
    public router: Router,
    private registrationService: RegistrationService,
    private http: HttpClient,
    private route:ActivatedRoute) {
      this.patientData = new PatientsDetails();
     }

  ngOnInit(): void {
        this.userDetail = JSON.parse(sessionStorage.getItem('userData') || '');
        this.patient_name=this.route.snapshot.params["id"];
        this.patient_time=this.route.snapshot.params["time"];
        console.log(this.patient_name)
        this.registrationService.getPatientDataById(this.userDetail.username,this.patient_name,this.patient_time).subscribe((data:any) => {
          console.log("data",data)
          if(data)
          {
            this.patientData = data[0];
            console.log("paten",this.patientData)
            
            this.status = (new Date(this.patientData.schedule_time) > new Date()) ? "onGoing" : "Completed";
            this.blood_pressure=(this.patientData.bloodPressure!="") ? this.patientData.bloodPressure: "N/A"
            this.pulse_rate=(this.patientData.pluseRate!="") ? this.patientData.pluseRate: "N/A"    

            // this.current_medication=(this.patientData.currentmedication!="") ? this.patientData.currentmedication?.split(","):"N/A"
          //  this.current_medication = (this.patientData.currentMedications!="" && this.patientData.currentMedications!="NA")
            
          if ((new Date(this.patientData.schedule_time).getDate() == new Date().getDate()) && (new Date(this.patientData.schedule_time).getMonth() == new Date().getMonth()) && (new Date(this.patientData.schedule_time).getHours() == new Date().getHours())) {
            this.disable_visit=false;
            // if(new Date(this.patientData.schedule_time) > new Date() || new Date(this.patientData.schedule_time) < new Date()){
            //       this.disable_visit=false;
            // }else{

            // }
	    }
          }
        });

  }

}
