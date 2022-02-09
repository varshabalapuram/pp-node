import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
  tickets:any;
  displayBasic: boolean=false;
  ticektData:any;
  constructor(private registrationService:RegistrationService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    
     
    this.registrationService.getTickets().subscribe((data:any)=>{
      this.tickets = data
    
     });
  }

  showDetails(data:any) {
  
    this.ticektData =data;
    this.displayBasic = true;
}


confirm1(reportData:any,flag:string) {
  
  reportData.status = flag;
  this.registrationService.updateTicketStatus(reportData.username,reportData).subscribe();
  this.registrationService.getTickets().subscribe((data:any)=>{
            this.tickets = data;
           
  
});
this.displayBasic=false;
}
}
