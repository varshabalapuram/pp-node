import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersDetails, PatientsDetails, VisitDetails } from '../app.model';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-visit-patient',
  templateUrl: './visit-patient.component.html',
  styleUrls: ['./visit-patient.component.css']
})
export class VisitPatientComponent implements OnInit {
  vitalsDetails!: FormGroup;
  procedureDetails!: FormGroup;
  ordersDetails!: FormGroup;
  vitals_step = false;
  procedure_step = false;
  orders_step = false;
  step = 1;

  phyPatientDetails?:any;

  
  userDetail:any;
  patient_name:any;
  patientData:PatientsDetails;
  patient_time:string='';
  visitDetails:VisitDetails;

  pcodes:any[] = [];
  dcodes:any[] = [];
  medProducts:any[] = [];
  labRepo: string[] = ["Complete blood count","Basic metabolic panel", "Comprehensive metabolic panel",
                        "Lipid panel", "Thyroid panel", "Cardiac biomarkers", "Sexually transmitted infection test",
                        "Coagulation Panel"," DHEA-sulfate serum test","C-reactive protein test"];
  
  radiologyRepo: string[] = ["Computed tomography (CT)","Magnetic resonance imaging (MRI)","chest x-ray",
                              "spine xray", "spine MRI", "brain CT scan", "Positron emission tomography (PET scan)"];
  
      constructor(private router:Router, private formBuilder: FormBuilder, private route:ActivatedRoute,private registrationService: RegistrationService) {
        this.patientData = new PatientsDetails();
        this.patientData.visitDetails = new VisitDetails();   
        this.visitDetails = new VisitDetails();
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
      
      }
    });
    this.registrationService.getPhysicianDataById(this.userDetail.username).subscribe((data:any) => {
      console.log("data",data)
      this.phyPatientDetails = data;


      console.log(data.patientsDetails.filter((item: any) => (item.username == this.patient_name && item.schedule_time == this.patient_time)))
      console.log("---------------------------------------------------");
      
      console.log(this.phyPatientDetails.patientsDetails.findIndex((item: any) => (item.username == this.patient_name && item.schedule_time == this.patient_time)));
      console.log("---------------------------------------------------");
      

    });
    
    this.vitalsDetails = this.formBuilder.group({
      bodyTemprature: ['', Validators.required],
      bloodPressure: ['', Validators.required],
      pulseRate: ['',Validators.required],
      height: ['',Validators.required],
      weight: ['',Validators.required]
    });

    this.procedureDetails = this.formBuilder.group({
      procedureCode: this.formBuilder.array([]),
      diagnosisCode:  this.formBuilder.array([]),
  });


  this.ordersDetails = this.formBuilder.group({
    labReports: this.formBuilder.array([]),
    radiologyReports:this.formBuilder.array([]),
    medications: this.formBuilder.array([]),
  });

  this.registrationService.getProcedureCodesData().subscribe((data:any[])=>
  {
    this.pcodes = data;
  });

  this.registrationService.getDaignosisCodesData().subscribe((data:any[])=>
  {
    this.dcodes = data;
  });

  this.registrationService.getMedicinesData().subscribe((data:any[])=>
  {
    this.medProducts = data;
  });

}

procedureCode() : FormArray {
  return this.procedureDetails.get("procedureCode") as FormArray
}
newprocedureCode(): FormGroup {
  return this.formBuilder.group({
    procedureCode: ['', Validators.required],
  })
}
 
addnewprocedureCode() {
  this.procedureCode().push(this.newprocedureCode());
}
diagnosisCode() : FormArray {
  return this.procedureDetails.get("diagnosisCode") as FormArray
}
newdiagnosisCode(): FormGroup {

  return this.formBuilder.group({

    diagnosisCode: ['', Validators.required],

  })

}
addnewdiagnosisCode() {
  this.diagnosisCode().push(this.newdiagnosisCode());
}

labReports() : FormArray {
  return this.ordersDetails.get("labReports") as FormArray
}

newmLabReports(): FormGroup {
  return this.formBuilder.group({
    labReports: ['', Validators.required],
  })
}
addnewLabReports() {
  this.labReports().push(this.newmLabReports());
} 

radiologyReports() : FormArray {
  return this.ordersDetails.get("radiologyReports") as FormArray
}
newmradiologyReports(): FormGroup {
  return this.formBuilder.group({
    radiologyReports: ['', Validators.required],
  })
}
addnewRadiologyReports() {
  this.radiologyReports().push(this.newmradiologyReports());
} 

medications() : FormArray {
  return this.ordersDetails.get("medications") as FormArray
}
newmedicine(): FormGroup {
  return this.formBuilder.group({
    medications: ['', Validators.required],
  })
}
 
addnewmedicine() {
  this.medications().push(this.newmedicine());
}     

  get vitals() { return this.vitalsDetails.controls; }
  get procedure() { return this.procedureDetails.controls; }
  get orders() { return this.ordersDetails.controls; }

  next(page:number){
    if(page==2){
          this.vitals_step = true;
          if (this.vitalsDetails.invalid) { return  }
          this.step++
    }
    if(page==3){
        this.procedure_step = true;
        if (this.procedureDetails.invalid) { return }
            this.step++;
    }
  }
  previous(){
    this.step--
    if(this.step==1){
      this.vitals_step = false;
    }
    if(this.step==2){
      this.orders_step = false;
    }
  }
  submit(){
    if(this.step==3 ){
      this.orders_step = true;
    
      let order = new OrdersDetails()
      order = this.ordersDetails.value



        // this.pcodes.findIndex
        this.visitDetails.ordersDetails =order;
        this.visitDetails.procedureDetails = this.procedureDetails.value;
        this.visitDetails.vitalsDetails= this.vitalsDetails.value;

        this.patientData.visitDetails  =  this.visitDetails;

        console.log("Finalllllllllllll");
        console.log(this.patientData);

        console.log("Final22222222222222222222222");

      console.log();

      this.phyPatientDetails.patientsDetails[this.phyPatientDetails.patientsDetails.findIndex((item: any) => (item.username == this.patient_name && item.schedule_time == this.patient_time))] = this.patientData;
      this.registrationService.addAppointmentData(this.userDetail.username,this.phyPatientDetails).subscribe(data=>{
        console.log(data);

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 3000);
        
      })
    }
  }



}
