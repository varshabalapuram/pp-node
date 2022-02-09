import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChartModule} from 'primeng/chart';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
//added by amol
import {AdminHeaderComponent} from './admin-header/admin-header.component';
import {AdminNavigationComponent} from './admin-navigation/admin-navigation.component'; 
import {FooterComponent} from './footer/footer.component';
import {PatientHeaderComponent} from './patient-header/patient-header.component';
import {PatientNavigationComponent} from './patient-navigation/patient-navigation.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CustomerService} from './json-data.service';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MenubarModule } from 'primeng/menubar';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';

import interactionPlugin from '@fullcalendar/interaction';

import dayGridPlugin from '@fullcalendar/daygrid';

import listPlugin from '@fullcalendar/list';

import timeGridPlugin from '@fullcalendar/timegrid';
import { DemographicsComponent } from './demographics/demographics.component';
import { VisitPatientComponent } from './visit-patient/visit-patient.component';
import { PatientOverviewComponent } from './patient-overview/patient-overview.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ManageAppointmentsComponent } from './manage-appointments/manage-appointments.component';
import { ManagePhysicianRecordComponent } from './manage-physician-record/manage-physician-record.component';
import { ManagePatientRecordsComponent } from './manage-patient-records/manage-patient-records.component';
import { ConfirmationService } from 'primeng/api';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MedAndAllergiesComponent } from './med-and-allergies/med-and-allergies.component';
import { PatientAptHistoryComponent } from './patient-apt-history/patient-apt-history.component';
import { ImmunizationComponent } from './immunization/immunization.component';
import { FilterDeptPipe } from './filter-dept.pipe';
import { SceduleAppointmentComponent } from './scedule-appointment/scedule-appointment.component';
import { RaiseTicketComponent } from './raise-ticket/raise-ticket.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { OrdersComponent } from './orders/orders.component';


FullCalendarModule.registerPlugins([   interactionPlugin,  dayGridPlugin,  listPlugin,  timeGridPlugin]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ManageUsersComponent,
    AdminHeaderComponent,
    AdminNavigationComponent,
    FooterComponent,
    PatientHeaderComponent,
    PatientNavigationComponent,
    LoginComponent,
    RegistrationComponent,
    SceduleAppointmentComponent,
    DemographicsComponent,
    VisitPatientComponent,
    PatientOverviewComponent,
    PatientDetailsComponent,
    ManageAppointmentsComponent,
    ManagePhysicianRecordComponent,
    ManagePatientRecordsComponent,
    MyprofileComponent,
    MedAndAllergiesComponent,
    PatientAptHistoryComponent,
    ImmunizationComponent,
    FilterDeptPipe,
    RaiseTicketComponent,
    ServiceRequestComponent,
    OrdersComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    LoginModule,
    ReactiveFormsModule,
    FullCalendarModule
    
  ],
  providers: [
    CustomerService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class AppModule { }


