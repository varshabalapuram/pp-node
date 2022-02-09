import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../json-data.service';
import { Customer } from '../patients';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
    registeredUsers!: Customer[];
    newUsers!:Customer[];    
    scrollableCols: any[]=[];
   

    constructor(private customerService: CustomerService) { }
    
    ngOnInit() {
        this.customerService.getCustomersMedium().then(data => {
             this.newUsers = data.filter(userData => userData.status?.toLowerCase() == 'n' )
            
        });

        this.scrollableCols = [
            { field: 'name', header: 'Name' },
            { field: 'id', header: 'Id' },
            { field: 'date', header: 'Date' },
            { field: 'company', header: 'Company' },
            { field: 'status', header: 'Status' },
            { field: 'activity', header: 'Activity' }
        ];
    }
   
      
}
