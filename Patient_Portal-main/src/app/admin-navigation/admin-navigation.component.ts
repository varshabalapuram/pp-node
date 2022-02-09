import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../login/login.component';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit {

  sideToggle:boolean=true;
  public userDetails: UserDetails;
  items!: MenuItem[];
  profile_img:string='';

  constructor() { 
    this.userDetails = new UserDetails();

  }

  ngOnInit(): void {
    let use = JSON.parse(sessionStorage.getItem('userData') || '');
    this.userDetails=use.data
    console.log("navvvvvv",this.userDetails)
    if(this.userDetails.role =="Physician"){
      if(this.userDetails.profile_pic!=undefined)
          this.profile_img=this.userDetails.profile_pic
       else
        this.profile_img="assets/Images/img_avatar.png"
    }
    console.log(this.userDetails)

    console.log(this.userDetails.username);
  

  }
  toggleClick(){
    if(!this.sideToggle)
    {
      this.sideToggle =true;
    }else
    {
      this.sideToggle = false;

    }
    
    console.log(this.sideToggle)
  }


}
