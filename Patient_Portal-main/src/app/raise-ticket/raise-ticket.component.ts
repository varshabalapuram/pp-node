import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration/registration.service';
import { MessageService } from 'primeng/api';
import { tick } from '@angular/core/testing';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.css']
})
export class RaiseTicketComponent implements OnInit {

  formData:any;
  myTickets:any;
  pendingTickets:number=0;
  approvedTickets:number=0;
  declinedTickets:number=0;
  maxId:any;  
  ticketData:any
  ticketForm = new FormGroup({
    title: new FormControl('',Validators.required),
    body: new FormControl('',Validators.required),
  }) 
  constructor(private regService:RegistrationService, private msgServ:MessageService) { }

  ngOnInit(): void {
    
    this.getData();
  }

  getData(){
   

    this.regService.getTickets().subscribe((data:any)=>{
    this.ticketData = data;
    this.setData();
    })

}

setData(){
  
  this.pendingTickets=0;
  this.approvedTickets=0;
  this.declinedTickets=0;
  this.maxId = this.ticketData.reduce((p:any, c:any) => p.username > c.username ? p : c);
  let userDetail = JSON.parse(sessionStorage.getItem('userData') || '');
      
  this.myTickets =  this.ticketData.filter(function (d: any) {
    return d.uname == userDetail.username
  })

  for(var i=0;i<this.myTickets.length;i++){
    if(this.myTickets[i].status == 'approve'){
      this.approvedTickets++;
    }
    if(this.myTickets[i].status == 'decline'){
      this.declinedTickets++;
    }
    if(this.myTickets[i].status == ''){
      this.pendingTickets++;
    }
  } 
}


  raiseTicket() {
    
    let userDetail = JSON.parse(sessionStorage.getItem('userData') || '');
    this.formData = this.ticketForm.value;
    this.formData.username = this.maxId ? parseInt(this.maxId.username) + 1 : 1;

    this.formData.uname = userDetail.username;
    this.formData.status = "";
    let date= new Date();
    this.formData.raisedDate = date;
    
    this.regService.logTicket(this.formData).subscribe((data:any)=>{
      if(data){
       // alert("success");
        this.msgServ.add({severity:'success', summary: 'Success', detail: 'Your ticket has been raised successfully'});
        this.getData()
        this.ticketForm.reset();
       

      }
    });
  }
}
