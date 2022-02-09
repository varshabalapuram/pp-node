import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistrationService } from '../registration/registration.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDetails: LoginModel;
  public userDetails: UserDetails;
  public showProducts: boolean = false;
  public showError: boolean = false;
  public log: UserDetails;
  public msg: string = '';


  constructor(private messageService: MessageService, private reService: RegistrationService, private httpClient: HttpClient, public router: Router, public loginService: LoginService) {
    this.loginDetails = new LoginModel();
    this.userDetails = new UserDetails();

    this.log = new UserDetails();
  }

  ngOnInit(): void {
    this.showSuccess();
    sessionStorage.clear();

  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  validDetails(u: UserDetails) {
    this.showError = false;
    let h: boolean = false;
    if ((u.username != '' && u.username != undefined) && (u.userpass != '' && u.userpass != '')) {
      let loginData = { username: u.username, userpass: u.userpass }
      this.loginService.getLoginData(loginData).subscribe((data: UserDetails) => {
        this.userDetails = data
        sessionStorage.setItem('userData', JSON.stringify(this.userDetails));
        if (this.userDetails && this.userDetails.success && this.userDetails.message == "Successfully Logged in") {
          this.msg = "Logged in Success";
           this.messageService.add({ severity: 'success', summary: 'Success', detail: "Logged in Success" });
            h = true; 
           console.log(this.msg);
           this.router.navigate(['/dashboard']);
        }
        if (h == false) {
          this.showError = true;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Match Found.Please try again' });
          sessionStorage.clear();
        }
      });
    }
    else { console.log("jnbilbgvuyv"); this.msg = "Invalid user id or password"; }
  }


  // validDetails(u:UserDetails) {
  //   this.showError=false;
  //   let h:boolean=false;
  //   if((u.username!='' && u.username!=undefined) &&  (u.userpass!='' && u.userpass!=''))
  //   {
  //     this.loginService.getLoginData(u.username).subscribe((data: any) => {
  //       console.log(data)
  //       this.userDetails = data.data ;
  //       sessionStorage.setItem('userData',JSON.stringify(this.userDetails));
  //         if(this.userDetails)
  //         {

  //         //  this.userDetails = this.userDetails;
  //           if(this.userDetails.userpass == u.userpass && this.userDetails.isActive=='Y')
  //           {
  //             this.msg = "Logged in Success";
  //             this.messageService.add({severity:'success', summary: 'Success', detail: "Logged in Success"});
  //             h=true;
  //             console.log(this.msg);
  //             this.router.navigate(['/dashboard']);
  //           }

  //         }

  //       if(h==false)
  //       {
  //         this.showError=true;
  //          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No Match Found.Please try again' });
  //         sessionStorage.clear();
  //       }
  //     });

  //   }
  //   else{
  //     console.log("jnbilbgvuyv");
  //     this.msg = "Invalid user id or password";

  //   }



  // }

  registration() {
    this.router.navigate(['/registration']);
  }


}


export class LoginModel {
  "userDetails": UserDetails[]
}``
export class UserDetails {
  "data":any;
  "success":boolean
  "message":string;
  "id": number
  "firstname": string;
  "lastname": string;
  "dob": string;
  "username": string;
  "role": string;
  "email": string;
  "phone": string;
  "userpass": string;
  "isActive": string
  "demographics": any;
  "sceduledAppointments": any[] = [];
  "immunization": any[] = [];
  "currentMedications": any[] = [];
  "allergies": any[] = [];
  "profile_pic": string;
  "regDate": any;
}



          // "node_modules/jquery/dist/jquery.min.js",
          // "node_modules/primeflex/primeflex.css",  
          // "node_modules/primeicons/primeicons.css",
          //     "node_modules/quill/dist/quill.snow.css",