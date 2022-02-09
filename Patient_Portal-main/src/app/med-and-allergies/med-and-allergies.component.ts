import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-med-and-allergies',
  templateUrl: './med-and-allergies.component.html',
  styleUrls: ['./med-and-allergies.component.css']
})
export class MedAndAllergiesComponent implements OnInit {

  formData: any;
  allergyFormData: any;
  med: any[] = [];
  userDetails:any;
  userName:any;
  currentMedDetails:any[] = [];
  allergiesData: any[] = [];
  allergyDetails:any[] = [];

  // added by ashwini

  displayAllergyForm:boolean=false;
  disableMediFields:boolean=false;

  medForm = new FormGroup({
    drugName: new FormControl('',Validators.required),
    drugStrength: new FormControl('',Validators.required),
    drugForm: new FormControl('',Validators.required)
  });
  
  allergiesForm = new FormGroup({
    allergyName: new FormControl('',Validators.required),
    allergyType: new FormControl('',Validators.required),
    allerginicity: new FormControl('',Validators.required)
  });

constructor(private messageService: MessageService, private registrationService: RegistrationService,public loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userData') || '');
    this.userName = this.userDetails.username;
    this.currentMedDetails = this.userDetails.currentMedications;
    this.allergyDetails = this.userDetails.allergies;

    this.registrationService.getMedicinesData().subscribe((data:any[])=>
  {
    this.med = data;
  });

  this.registrationService.getAllergiesData().subscribe((data:any[])=>
  {
    this.allergiesData = data;
  });

  }
  

  // submit_med(){
  //   this.userDetails.currentMedications = this.currentMedDetails;
  //   this.registrationService.updateDemographics(this.userDetails.username,this.userDetails).subscribe(data=>
  //     {
  //       if(data)
  //       {
  //         sessionStorage.removeItem('userData');
  //         this.loginService.getLoginData(this.userDetails.username).subscribe((data: UserDetails)=>{
  //           this.userDetails = data ;
  //           sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
  //           setTimeout(() => {
  //             this.messageService.add({severity:'success', summary: 'Success', detail: 'Your Details Submited Successfully'});
  //           }, 3000);
  //         });
  //       }
  //     });
  //   this.medForm.reset();
  // }



  addDataMed(medData:any)
  {
  if(this.medForm.value.drugName==''||this.medForm.value.drugStrength==''||this.medForm.value.drugForm==''){

    this.messageService.add({severity:'error', summary: 'Medication Data Error', detail: 'Kindly fill all the details'});
    
  }
  else{
    let med = medData.value;
    this.currentMedDetails.push(med)
    this.medForm .reset()
    this.disableMediFields= false;
  }
  }

  deleteMedicatios(m:any)
  {
    console.log(this.currentMedDetails.findIndex(item=>(item.drugForm == m.drugForm && item.drugName == m.drugName && item.drugStrength == m.drugStrength  )));
    this.currentMedDetails.splice(this.currentMedDetails.findIndex(item=>(item.drugForm == m.drugForm && item.drugName == m.drugName && item.drugStrength == m.drugStrength  )),1)
    console.log(this.currentMedDetails);
    
  }

  addDataAlle(allergiesData:any)
  {
      if(this.allergiesForm.value.allergyName==''||this.allergiesForm.value.allergyType==''||this.allergiesForm.value.allerginicity==''){
    
        this.messageService.add({severity:'error', summary: 'Allergies Data Error', detail: 'Kindly fill all the details'});
        
      }
      else{
    let allergies = allergiesData.value;
    this.allergyDetails.push(allergies)
    this.allergiesForm.reset();
  }
}

  deleteAllergies(m:any){
  
    this.allergyDetails.splice(this.allergyDetails.findIndex(item=>(item.allergyName == m.allergyName && item.allergyType == m.allergyType && item.allerginicity == m.allerginicity  )),1)
    console.log(this.allergyDetails);
  }

  // submit_allergies(){
  //   this.userDetails.allergyDetails = this.allergyDetails;
  //   this.registrationService.updateDemographics(this.userDetails.username,this.userDetails).subscribe(data=>
  //     {
  //       if(data)
  //       {
  //         sessionStorage.removeItem('userData');
  //         this.loginService.getLoginData(this.userDetails.username).subscribe((data: UserDetails)=>{
  //           this.userDetails = data ;
  //           sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
  //           setTimeout(() => {
  //             this.messageService.add({severity:'success', summary: 'Success', detail: 'Your Details Submited Successfully'});
  //           }, 3000);
  //         });
  //       }
  //     });
  //   this.allergiesForm.reset();
  // }



  // added by ashwini

  addAllergiesData(){
    this.displayAllergyForm = true;
  }  

  setValues(val:any, type:string){
    if(val.target.value=='NA' && type=='medicine'){
      this.medForm.controls.drugStrength.setValue('NA')
      this.medForm.controls.drugForm.setValue('NA')
      this.disableMediFields= true;
      }
    if(val.target.value=='NA' && type=='allergies'){
      this.allergiesForm.controls.allergyType.setValue('NA')
      this.allergiesForm.controls.allerginicity.setValue('NA')
      }
  }

  
  submitAllData(){
    this.userDetails.currentMedications = this.currentMedDetails;
    this.registrationService.updateDemographics(this.userDetails.username,this.userDetails).subscribe(data=>
      {
        if(data)
        {
          sessionStorage.removeItem('userData');
          this.loginService.getLoginData(this.userDetails.username).subscribe((data: UserDetails)=>{
            this.userDetails = data ;
            sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
            
          });
        }
      });
    this.medForm.reset();

    this.userDetails.allergies = this.allergyDetails;
    this.registrationService.updateDemographics(this.userDetails.username,this.userDetails).subscribe(data=>
      {
        if(data)
        {
          sessionStorage.removeItem('userData');
          this.loginService.getLoginData(this.userDetails.username).subscribe((data: UserDetails)=>{
            this.userDetails = data ;
            sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
            
              this.messageService.add({severity:'success', summary: 'Medication & Allergy Details', detail: 'Your Details Submited Successfully'});
          
          });
        }
      });
    this.allergiesForm.reset();
    setTimeout(() => {
    this.router.navigate(["immunization"]);
  }, 2000);
  }

  previousPage(){
    this.displayAllergyForm = false;
  }
}
