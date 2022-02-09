import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';

const sampleData:any[] = [
  {
    "firstname": "Admin",
    "lastname": "admin",
    "dob": "12/08/1917",
    "username": "admin",
    "role": "Admin",
    "email": "admin.@example.com",
    "phone": "9839973733",
    "userpass": "admin123",
    "isActive": "Y",
    "id": 5,
    "demographics": {},
    "sceduledAppointments": [],
    "immunization": [],
    "allergies": [],
    "currentMedications": []
  },
  {
    "firstname": "jasmine",
    "lastname": "verna",
    "email": "jasmine@gmail.com",
    "userpass": "login123",
    "dob": "2021-11-18",
    "username": "jasminev",
    "role": "Patient",
    "regDate": "Mon Nov 14 2021 11:24:56 GMT+0530 (India Standard Time)",
    "phone": "9678909999",
    "isActive": "N",
    "demographics": {},
    "sceduledAppointments": [],
    "immunization": [],
    "allergies": [],
    "currentMedications": []
  },
  {
    "isActive": "Y",
    "firstname": "Teresa",
    "lastname": "Mayer",
    "username": "Dr. Teresa Mayer",
    "dob": "12/08/1976",
    "role": "Physician",
    "desc": "Gynecologist | Internal Medicine  | 10 yrs Exp",
    "type": "Physician",
    "regDate": "Mon Nov 01 2021 11:24:56 GMT+0530 (India Standard Time)",
    "location": "California",
    "profile_pic": "https://themetechmount.com/html/delmont/images/team-member/team-img03.jpg",
    "overview": "Dr. Teresa Mayer is assistant professor of her department completed her practice at university of california,were she served as chief resident during her final year,she is board certified in her department.",
    "email": "Andrew.Bert@example.com",
    "phone": "9837374433",
    "userpass": "login123"
  },
  {
    "isActive": "Y",
    "firstname": "John",
    "lastname": "Quil",
    "username": "Dr.John Quil",
    "dob": "12/08/1966",
    "role": "Physician",
    "regDate": "Mon Nov 19 2021 11:24:56 GMT+0530 (India Standard Time)",
    "desc": "Cardiologist  | Internal Medicine| 10 yrs Exp",
    "type": "Physician",
    "location": "California",
    "profile_pic": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzTCpIN_DqGQLq5kID4bplxr1yrVESq4MwpwQ_GnyktwTuKXRti0PvIP0G8DJeVN6in4&usqp=CAU",
    "overview": "Dr.John Quil is assistant professor of her department completed her practice at university of california,were she served as chief resident during her final year,she is board certified in her department.",
    "email": "Andrew.Bert@example.com",
    "phone": "9837374433",
    "userpass": "login123"
  }
]

describe('LoginService', () => {
  let service: LoginService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:  [LoginService]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new LoginService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<any[]>',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(sampleData));

    service.getLoginData("admin").subscribe(
      (resData) => {
        expect(resData).toEqual(sampleData);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });
});
