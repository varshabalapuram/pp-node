import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DemographicsComponent } from './demographics/demographics.component';
import { VisitPatientComponent } from './visit-patient/visit-patient.component';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManagePhysicianRecordComponent } from './manage-physician-record/manage-physician-record.component';
import { ManagePatientRecordsComponent } from './manage-patient-records/manage-patient-records.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MedAndAllergiesComponent } from './med-and-allergies/med-and-allergies.component';
import { PatientAptHistoryComponent } from './patient-apt-history/patient-apt-history.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { SceduleAppointmentComponent } from './scedule-appointment/scedule-appointment.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { AuthgaurdService } from './authgaurd.service';
import { OrdersComponent } from './orders/orders.component';
import { DeactivategaurdService } from './deactivategaurd.service';

export  const routes: Routes = [

  {path:'',component:LoginComponent},

  { path: 'manageUsers', component: ManageUsersComponent,canActivate : [AuthgaurdService] },
  {path : 'dashboard', component:DashboardComponent,canActivate : [AuthgaurdService]},
  {path : 'patientDetails', component:PatientDetailsComponent,canActivate : [AuthgaurdService]},

  {
    path:'registration',component:RegistrationComponent,
  },
  {path : 'visitPatient/:id/:time', component:VisitPatientComponent,canActivate : [AuthgaurdService]},
  {
    path:'patientOverview/:id/:time',component:PatientOverviewComponent,canActivate : [AuthgaurdService],
  },
  {
    path:'login',component:LoginComponent,
  },
  {
    path:'demographics',component:DemographicsComponent,canActivate : [AuthgaurdService]
  },
  {
    path:'medications',component:MedAndAllergiesComponent,canActivate : [AuthgaurdService]
  },{
    path:'appointmentHistory',component:PatientAptHistoryComponent,canActivate : [AuthgaurdService]
  },
  {
    path:'profile',component:MyprofileComponent,canActivate : [AuthgaurdService]
  },
  { path: 'raiseTicket', component: RaiseTicketComponent,canActivate : [AuthgaurdService] }, 
  { path: 'serviceRequest', component: ServiceRequestComponent,canActivate : [AuthgaurdService] }, 
  {
    path:'sceduleappointments',component:SceduleAppointmentComponent,canActivate : [AuthgaurdService]
  },
  { path: 'manageAppointments', component: ManageAppointmentsComponent,canActivate : [AuthgaurdService] }, 
  { path: 'physicianRecords', component: ManagePhysicianRecordComponent,canActivate : [AuthgaurdService] }, 
  { path: 'patientRecords', component: ManagePatientRecordsComponent,canActivate : [AuthgaurdService] }, 

  { path: 'orders', component: OrdersComponent,canActivate : [AuthgaurdService] }, 
  { path: 'immunization', component: ImmunizationComponent,canDeactivate:[DeactivategaurdService],canActivate : [AuthgaurdService] }, 

  { path: '*', component: LoginComponent }, 
  //{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
