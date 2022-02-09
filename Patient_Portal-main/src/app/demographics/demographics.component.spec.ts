import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminNavigationComponent } from '../admin-navigation/admin-navigation.component';
import { routes } from '../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { RegistrationService } from '../registration/registration.service';

import { DemographicsComponent } from './demographics.component';

describe('DemographicsComponent', () => {
  let component: DemographicsComponent;
  let fixture: ComponentFixture<DemographicsComponent>;
  let router:Router;
  let loginService: LoginService;
  let registrationService:RegistrationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemographicsComponent, AdminHeaderComponent, AdminNavigationComponent, LoginComponent ],
      imports :  [FormsModule, ReactiveFormsModule, HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)],
      providers:[RegistrationService, LoginService]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService)
    registrationService = TestBed.inject(RegistrationService)
    router.initialNavigation();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('it should Check initial form values for patientForm formgroup', () => {
  //   const patientFormGroup = component.patientForm;
  //   const patientFormValues = {
  //     weight: '',
  //     height: '',
  //     age: '',
  //     bloodPressure: '',
  //     pluseRate: '',
  //     ethnicity: '',
  //     education: '',
  //     employment: '',
  //     address: '',
  //     phoneNo: '',
  //     medHistory: '',
  //     surgeries: '',
  //     familyMedHistory: '',
  //     provider: '',
  //     gender: ''
  //   }
  //   expect(patientFormGroup.value).toEqual(patientFormValues);
  // });
});
