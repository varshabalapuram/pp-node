import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserDetails } from '../login/login.component';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registration : UserDetails;
  public userDetails: UserDetails;

  public showError:boolean=false;
  public rePassword:string='';
  public errorMsg:string='';
  public sucessError:boolean=false;
  public sucessMsg="";
  public minAge:any;
  registrationForm = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    userpass: new FormControl('',[Validators.required,Validators.minLength(8)]),
    dob: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    role: new FormControl(''),
    type: new FormControl(''),
    desc: new FormControl(''),
    overview: new FormControl(''),
    location: new FormControl(''),

    // desc: new FormControl('',[Validators.required,Validators.minLength(10)]),
    // overview: new FormControl('',[Validators.required,Validators.minLength(10)]),
    // location: new FormControl('',Validators.required),
    



    

    phone: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[0-9]{10}')]),
    // tandc: new FormControl(false,Validators.requiredTrue),
  }) 

  constructor(private messageService: MessageService,private reService:RegistrationService,public router:Router) { 
    this.registration = new UserDetails();
    this.userDetails = new UserDetails();
  }

  ngOnInit(): void {
    sessionStorage.removeItem('userData');

  // this.reService.data().subscribe(data=>{
  //   console.log(data);
    
  // });
  let today = new Date();
  var minAge = 18;
  this.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  }

  validDetails() {
    this.errorMsg ="";
    this.sucessMsg="";
    if(this.rePassword==this.registrationForm.value.userpass)
    {
      this.registration = this.registrationForm.value;
      this.userDetails.username = this.registration.username ;
      this.userDetails.userpass = this.registration.userpass ;
      this.userDetails.role = this.registration.role ;
      if(this.userDetails.role=='Patient')
      {
        this.registration.isActive = 'Y';
        this.registration.demographics= {};
        this.registration.sceduledAppointments=[];
        this.registration.immunization =[];
        this.registration.allergies=[];
        this.registration.currentMedications=[];
      }
      else{
        this.registration.isActive = 'N';
        this.registration.profile_pic = "http://arianasabethospital.af/wp-content/uploads/2020/08/Dr-Avatar-01.jpg"; 
      }
      this.registration.regDate = new Date()
      
  
      this.reService.addPerson(this.registration).subscribe((data: any) => {
        
        if(data)
        {
          this.userDetails = data;
          this.messageService.add({severity:'success', summary: 'Success', detail: this.registration.username+" have Succefully Registered"});
          this.sucessMsg=this.registration.username+" have Succefully Registered";
          this.sucessError=true;
          setTimeout(() => {
          this.router.navigate(['/login']);
          }, 3000);

        }
  
        console.log(this.userDetails);
        
      });
    }
    else{
      this.showError=true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Retype Password didn't match with Password" });
      // this.errorMsg ="Retype Password didn't match with Password"
    }
  

    
    // this.reService.addLoginData(this.userDetails).subscribe((data: any) => {
    //   this.userDetails = data;

    //   console.log(this.userDetails);
      
    // });

    // this.httpClient.post("assets/Json/registration_data.json" ,this.registration).subscribe((data: any) => {
    //   this.userDetails = data.userDetails;
    //   console.log(data);
    // });
    // this.httpClient.post("assets/Json/logindata.json" ,this.userDetails).subscribe((data: any) => {
    //   console.log(data);
      
    // });

  }

}


