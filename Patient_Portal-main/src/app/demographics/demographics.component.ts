import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetails } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css']
})
export class DemographicsComponent implements OnInit {

  userDetails:any = {};
  demographicsDetails :any;
  username:string='';
  constructor(private registrationService:RegistrationService,private router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('userData') || '');
    this.username = this.userDetails.username;
  }

 
  patientForm:FormGroup=new FormGroup({
    weight: new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.maxLength(3)]),
    height: new FormControl('',[Validators.required,Validators.pattern(/^\d*\.?\d{0,2}$/g),Validators.maxLength(3)]),
    age: new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.maxLength(3)]),
    bloodPressure: new FormControl('',[Validators.required,Validators.pattern(/^[0-9/+()]*$/),Validators.maxLength(6)]),
    pluseRate: new FormControl('',[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$'),Validators.maxLength(3)]),
    
    
    // : new FormControl('',Validators.required),

    ethnicity:new FormControl('',Validators.maxLength(50)),
    education: new FormControl('',Validators.maxLength(50)),
    employment:new FormControl('',Validators.maxLength(50)),
    address:new FormControl('',[Validators.minLength(10),Validators.maxLength(50)]),
    phoneNo:new FormControl('',Validators.pattern("\\d{10}")),
    medHistory:new FormControl('',Validators.maxLength(50)),
    surgeries:new FormControl('',Validators.maxLength(50)),
    familyMedHistory:new FormControl('',Validators.maxLength(50)),
    provider:new FormControl('',Validators.maxLength(50)),
    gender:new FormControl('',Validators.required),
    // dob:new FormControl('',Validators.required)
  });
  
  result:string  = "";


  public submit_click():void
  {
 
    this.demographicsDetails =this.patientForm.value;

    this.userDetails.demographics = this.demographicsDetails;
    
    console.log(this.demographicsDetails);
    console.log(this.userDetails);

    
   this.registrationService.updateDemographics(this.userDetails.username,this.userDetails.demographics).subscribe(data=>
    {
       console.log(data);
       if(data && data.username!="")
       {
         sessionStorage.removeItem('userData');
          this.loginService.getLoginData(this.userDetails.username).subscribe((data: UserDetails) => {
            this.userDetails = data ;
            sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
              if(this.userDetails)
              {
                if(this.userDetails.userpass != '' && this.userDetails.isActive=='Y')
                {
                  this.router.navigate(['/medications']);

                }
      
              }
             
    
          });
       }
    });
  }
}
