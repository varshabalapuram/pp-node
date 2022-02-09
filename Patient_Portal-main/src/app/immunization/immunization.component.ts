import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegistrationService } from '../registration/registration.service';
import { LoginService } from '../login/login.service';
import { MessageService } from 'primeng/api';
import { Router, RouteReuseStrategy } from '@angular/router';


@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css']
})
export class ImmunizationComponent implements OnInit {

  vaccinateddate?:Date;
  noofdozes?:number
  immunizationform!: FormGroup;
  vaccinename:string[];
  showTable=false;
  immunization: vaccine[]=[];
  userDetails: any;
  userName: any;
  userDetail: any;
  disableFields:boolean = false;


  constructor(private registrationService:RegistrationService,private formBuilder: FormBuilder,public loginService:LoginService,private messageService: MessageService,private router: Router) { 
   // this.vaccinedeatils=new vaccine();
   this.vaccinename=["NA","COVID-19","Hepatitis","Influenza","HIB","Rotavirus","IPV","MMR","DTap"]
    }
  
  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userData') || '');

    console.log("31imnuuuuu",this.userDetails)
    this.userName = this.userDetails.username;
    this.immunization = [...this.userDetails.immunization]
  
    this.immunizationform = this.formBuilder.group({
      vaccine: ['', Validators.required],
      vaccinateddate: ['', [Validators.required]],
      noofdozes: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
  }

  addData()
  {

    if(this.immunizationform.value.vaccine==''||this.immunizationform.value.noofdozes==''||this.immunizationform.value.vaccinateddate==''){

      this.messageService.add({severity:'error', summary: 'Immunization Data Error', detail: 'Kindly fill all the details'});
      
    }
    else{
    let immune = this.immunizationform.value;
    this.immunization.push(immune)
    this.immunizationform = this.formBuilder.group({
      vaccine: ['', Validators.required],
      vaccinateddate: ['', [Validators.required]],
      noofdozes: ['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
    console.log(this.userDetails.immunization)
    this.disableFields =false;
  }
}
  deleteMedicatios(m:any)
  {
    console.log(this.immunization.findIndex(item=>(item.vaccine == m.vaccine && item.vaccinateddate == m.vaccinateddate && item.noofdozes == m.noofdozes  )));
    this.immunization.splice(this.immunization.findIndex(item=>(item.vaccine == m.vaccine && item.vaccinateddate == m.vaccinateddate && item.noofdozes == m.noofdozes  )),1)
    console.log(this.immunization);
  }

  submit_med(){
    console.log("clcies")
    this.userDetails.immunization = this.immunization;
    this.registrationService.updateDemographics(this.userDetails.username,this.userDetails).subscribe(data=>
      {
        if(data)
        {
          sessionStorage.removeItem('userData');
          this.loginService.getLoginData(this.userDetails.username).subscribe((data)=>{
            this.userDetails = data ;
            sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
        
              this.messageService.add({severity:'success', summary: 'Success', detail: 'Your Details Submited Successfully'});
        
          });
          setTimeout(() => {
            this.router.navigate(["sceduleappointments"]);
          }, 1000);

        }
      });
  this.immunizationform.reset();
  }

  canExit() : boolean {
    console.log("this.immunization.length",this.immunization.length)
    console.log("this.userDetails.immunization.length",this.userDetails.immunization.length)

    if ( this.immunization.length!=this.userDetails.immunization.length) {
      alert("please submit the details before proceeding")
      return false;
    }
    else
    {
      return true;
    }
  }

  setValues(){
    if(this.immunizationform.value.vaccine=="NA"){
    this.disableFields = true;
    
    this.immunizationform.controls.noofdozes.setValue('NA')
    }
  }
   
  
}
class vaccine{
  id:string="";
  vaccine:string="";
  vaccinateddate:any=""
  noofdozes:number=0;

}
