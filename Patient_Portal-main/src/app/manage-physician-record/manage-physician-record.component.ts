import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-manage-physician-record',
  templateUrl: './manage-physician-record.component.html',
  styleUrls: ['./manage-physician-record.component.css']
})
export class ManagePhysicianRecordComponent implements OnInit {

  Locations:string[]=[];
  physicianRecord:any[]=[];
  location:string="";
  Doctors_temp:any[]=[];
  specializations:any[]=[];
  specialization:string=''
  status:any[]=[];
  displayBasic: boolean=false;
  activeStatus:string=''
  
  p_username:any='';
  p_src:any='';
  p_disc:any='';
  p_location:any='';
  p_phone:any='';
  p_overview:any='';
  p_email:any='';
  p_active:any='';
  p_regOn:any='';
  isBlocked:boolean=false;
  constructor(private registrationService: RegistrationService,private primengConfig: PrimeNGConfig) { 
    this.Locations=["sort by Location","California","Florida","Mexico","California","All"]
    this.location = this.Locations[0]
    this.specializations=["sort by specialization","Neurologist","General Physican","Gynecologist","Cardiologist","Neurology specialist","Dermitologits","Orthopedic","Pediatrician","All"]
    this.specialization = this.specializations[0]
    this.status=["sort by Active Status","Approved","Pending","All"]
    this.activeStatus = this.status[0]
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

  // this.registrationService.getPhysicianData().subscribe((data: any) => {
  //   this.physicianRecord = data;
  //   this.Doctors_temp = data;
  // });
  this.getPhysicianData();
}

getPhysicianData(){
  
  this.registrationService.getData().subscribe((data: any) => {
    let userData = data;
    
    this.physicianRecord = userData.filter(function (d: any) {
      return d.role.toLowerCase() == 'physician';
    });
    this.Doctors_temp = this.physicianRecord;
});
}

sortByLocation(){
  if(this.location=="All" || this.location=="sort by Location"){
     this.Doctors_temp=this.physicianRecord;
  }else{
      this.Doctors_temp=this.physicianRecord.filter(item => item.location == this.location)
  }
}

sortBySpecialization(){
  if(this.specialization=="All" || this.specialization=="sort by specialization"){
     this.Doctors_temp=this.physicianRecord;
  }else{
      this.Doctors_temp=this.physicianRecord.filter(item => item.desc.includes(this.specialization))
  }
}

sortByActiveStatus(){
  if(this.activeStatus=="All" || this.activeStatus=="sort by Active status"){
    this.Doctors_temp=this.physicianRecord;
 }else if(this.activeStatus=='Approved'){
  this.Doctors_temp=this.physicianRecord.filter(item => item.isActive == 'Y')
 }else if(this.activeStatus=='Pending'){
  this.Doctors_temp=this.physicianRecord.filter(item => item.isActive == 'N')
 }
}

showBasicDialog(us:any) {
  
  
  this.p_username= us.username;
  this.p_src= us.profile_pic;
  this.p_disc= us.desc;
  this.p_phone= us.phone;
  this.p_email= us.email;
  this.p_location= us.location;
  this.p_overview= us.overview;
  this.p_active= us.isActive;
  this.p_regOn= us.regDate;

  this.displayBasic = true;
}


blockUser(id:any){
  this.registrationService.getDataById(id).subscribe((response: any) => {
    response.isActive = 'B';
    let body: any = response;
    this.registrationService.updateActiveStatus(response.username,body).subscribe();
    this.getPhysicianData();
    this.isBlocked = true;
});
}

unblockUser(id:any){
  this.registrationService.getDataById(id).subscribe((response: any) => {
    response.isActive = 'Y';
    let body: any = response;
    this.registrationService.updateActiveStatus(response.username,body).subscribe();
    this.getPhysicianData();
    this.isBlocked = false;
});
}
}
