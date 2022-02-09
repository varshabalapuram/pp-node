import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { RegistrationService } from './registration.service';

const registrationDetails:any[] = [
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
];

const physicianData: any[] = [
  {
    "isActive": false,
    "username": "Dr.Andrew Bert",
    "desc": "General Physican  | Internal Medicine | 10 yrs Exp",
    "type": "Physician",
    "location": "California",
    "profile_pic": "https://themetechmount.com/html/delmont/images/team-member/team-img01.jpg",
    "overview": "Dr.Andrew Bert is assistant professor of her department.She completed her practice at university of california,were she served as chief resident during her final year,she is board certified in her department.",
    "patientsDetails": [
      {
        "weight": "60",
        "height": "160",
        "age": "25",
        "bloodPressure": "56",
        "pluseRate": "67",
        "ethnicity": "Indian",
        "education": "B.tech",
        "employment": "Software",
        "address": "Hyderabad , KBHP",
        "phoneNo": "9876543211",
        "medHistory": "NA",
        "surgeries": "Hand Fracture",
        "familyMedHistory": "NA",
        "provider": "Royal",
        "gender": "male",
        "username": "vishwanthk",
        "email": "kota.vishwanth@example.com",
        "dob": "12/08/1947",
        "currentMedications": [
          {
            "drugName": "PAREDRINE",
            "drugStrength": "500MG",
            "drugForm": "TABLET;ORAL"
          }
        ],
        "allergies": [
          {
            "allergyName": "Bovine",
            "allergyType": "Animal",
            "allerginicity": "IgE plus basophil+ or SPT+"
          }
        ],
        "immunization": [
          {
            "vaccine": "Hepatitis",
            "vaccinateddate": "2021-11-09",
            "noofdozes": "1"
          },
          {
            "vaccine": "COVID-19",
            "vaccinateddate": "2021-10-06",
            "noofdozes": "2"
          }
        ],
        "notes": "Cold",
        "schedule_time": "Wed Dec 08 2021 13:41:19 GMT+0530 (India Standard Time)",
        "type": "Viral",
        "visitDetails": {
          "ordersDetails": {
            "labReports": [
              {
                "labReports": "Complete blood count"
              }
            ],
            "radiologyReports": [
              {
                "radiologyReports": "brain CT scan"
              }
            ],
            "medications": [
              {
                "medications": "HEPARIN SODIUM5,000 UNITS/ML"
              }
            ]
          },
          "procedureDetails": {
            "procedureCode": [
              {
                "procedureCode": "16070 Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute"
              }
            ],
            "diagnosisCode": [
              {
                "diagnosisCode": "F69 Unspecified disorder of adult personality and behavior"
              }
            ]
          },
          "vitalsDetails": {
            "bodyTemprature": "98",
            "bloodPressure": "110",
            "pulseRate": "56",
            "height": "167",
            "weight": "67"
          }
        }
      },
      {
        "weight": "56",
        "height": "156",
        "age": "45",
        "bloodPressure": "45",
        "pluseRate": "45",
        "ethnicity": "Indian",
        "education": "MA",
        "employment": "Software",
        "address": "Hyderabad , Malakpet",
        "phoneNo": "8767876767",
        "medHistory": "NA",
        "surgeries": "Leg Surgery",
        "familyMedHistory": "NA",
        "provider": "Erie ",
        "gender": "female",
        "username": "varshab",
        "email": "balapuram.varsha@example.com",
        "dob": "12/08/1927",
        "currentMedications": [
          {
            "drugName": "PAREDRINE",
            "drugStrength": "500MG",
            "drugForm": "SOLUTION/DROPS;OPHTHALMIC"
          }
        ],
        "allergies": [
          {
            "allergyName": "Domestic guinea pig",
            "allergyType": "Animal",
            "allerginicity": "IgE plus basophil+ or SPT+"
          }
        ],
        "immunization": [
          {
            "vaccine": "COVID-19",
            "vaccinateddate": "2021-12-02",
            "noofdozes": "2"
          }
        ],
        "notes": "Cold",
        "schedule_time": "Wed Dec 08 2021 14:07:17 GMT+0530 (India Standard Time)",
        "type": "Routine Visit",
        "visitDetails": {
          "ordersDetails": {
            "labReports": [
              {
                "labReports": "Complete blood count"
              },
              {
                "labReports": "Sexually transmitted infection test"
              }
            ],
            "radiologyReports": [
              {
                "radiologyReports": "brain CT scan"
              }
            ],
            "medications": [
              {
                "medications": "HEPARIN SODIUM10,000 UNITS/ML"
              }
            ]
          },
          "procedureDetails": {
            "procedureCode": [
              {
                "procedureCode": "16070 Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute"
              },
              {
                "procedureCode": "16076 Bypass Cerebral Ventricle to Peritoneal Cavity with Autologous Tissue Substitute"
              }
            ],
            "diagnosisCode": [
              {
                "diagnosisCode": "T7631XD Adult psychological abuse, suspected, subsequent encounter"
              }
            ]
          },
          "vitalsDetails": {
            "bodyTemprature": "98",
            "bloodPressure": "79",
            "pulseRate": "79",
            "height": "169",
            "weight": "67"
          }
        }
      },
      {
        "weight": "67",
        "height": "167",
        "age": "23",
        "bloodPressure": "110/94",
        "pluseRate": "12",
        "ethnicity": "Indian",
        "education": "B.tech",
        "employment": "Teacher",
        "address": "Hyderabad , KBHP",
        "phoneNo": "9876543211",
        "medHistory": "NA",
        "surgeries": "NA",
        "familyMedHistory": "NA",
        "provider": "Eriw",
        "gender": "male",
        "username": "adarsht",
        "email": "adarsh@gmail.com",
        "dob": "2021-11-19",
        "currentMedications": [
          {
            "drugName": "PAREDRINE",
            "drugStrength": "1%",
            "drugForm": "SOLUTION/DROPS;OPHTHALMIC"
          }
        ],
        "allergies": [
          {
            "allergyName": "Bovine",
            "allergyType": "Animal",
            "allerginicity": "IgE but no biological test"
          }
        ],
        "immunization": [
          {
            "vaccine": "COVID-19",
            "vaccinateddate": "2021-11-10",
            "noofdozes": "2"
          }
        ],
        "notes": "Fever",
        "schedule_time": "Thu Nov 09 2021 15:54:39 GMT+0530 (India Standard Time)",
        "type": "Routine Visit"
      }
    ],
    "sceduledAppointments": [
      "Wed Dec 08 2021 13:41:19 GMT+0530 (India Standard Time)",
      "Wed Dec 08 2021 14:07:17 GMT+0530 (India Standard Time)",
      "Thu Nov 09 2021 15:54:39 GMT+0530 (India Standard Time)"
    ]
  },
  {
    "isActive": false,
    "username": "Dr. Metthew Wood",
    "desc": "Neurologist  | Internal Medicine | 10 yrs Exp",
    "type": "Physician",
    "location": "Florida",
    "profile_pic": "http://themetechmount.com/html/delmont/images/team-member/team-img02.jpg",
    "overview": "Dr. Metthew Wood is assistant professor of her department completed her practice at university of california,were she served as chief resident during her final year,she is board certified in her department.",
    "patientsDetails": [
      {
        "weight": "67",
        "height": "167",
        "age": "25",
        "bloodPressure": "120/91",
        "pluseRate": "67",
        "ethnicity": "Indian",
        "education": "B.tech",
        "employment": "Teacher",
        "address": "Hyderabad,KPHB",
        "phoneNo": "9878767676",
        "medHistory": "NA",
        "surgeries": "Hand Surgery",
        "familyMedHistory": "NA",
        "provider": "Erie",
        "gender": "male",
        "username": "GouthamK",
        "email": "gouthamk@gmail.com",
        "dob": "1997-10-15",
        "currentMedications": [
          {
            "drugName": "LIQUAEMIN SODIUM",
            "drugStrength": "20,000 UNITS/ML",
            "drugForm": "INJECTABLE;INJECTION"
          }
        ],
        "allergies": [
          {
            "allergyName": "Bovine",
            "allergyType": "Animal",
            "allerginicity": "IgE but no biological test"
          }
        ],
        "immunization": [
          {
            "vaccine": "COVID-19",
            "vaccinateddate": "2021-10-06",
            "noofdozes": "2"
          }
        ],
        "notes": "Head ace",
        "schedule_time": "Wed Dec 08 2021 17:37:34 GMT+0530 (India Standard Time)",
        "type": "Routine Visit",
        "visitDetails": {
          "ordersDetails": {
            "labReports": [
              {
                "labReports": "Lipid panel"
              }
            ],
            "radiologyReports": [
              {
                "radiologyReports": "brain CT scan"
              }
            ],
            "medications": [
              {
                "medications": "LIQUAEMIN LOCK FLUSH100 UNITS/ML"
              }
            ]
          },
          "procedureDetails": {
            "procedureCode": [
              {
                "procedureCode": "16070 Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute"
              }
            ],
            "diagnosisCode": [
              {
                "diagnosisCode": "F0391 Unspecified dementia with behavioral disturbance"
              }
            ]
          },
          "vitalsDetails": {
            "bodyTemprature": "98",
            "bloodPressure": "120",
            "pulseRate": "56",
            "height": "160",
            "weight": "60"
          }
        }
      }
    ],
    "sceduledAppointments": [
      "Wed Dec 08 2021 17:37:34 GMT+0530 (India Standard Time)"
    ]
  }
];

const proCodes: any[] = [
  {
    "PCode": "16070",
    "Description": " Bypass Cerebral Ventricle to Nasopharynx with Autologous Tissue Substitute",
    "PType": " Open Approach"
  },
  {
    "PCode": "16071",
    "Description": " Bypass Cerebral Ventricle to Mastoid Sinus with Autologous Tissue Substitute",
    "PType": " Open Approach"
  },
  {
    "PCode": "16072",
    "Description": " Bypass Cerebral Ventricle to Atrium with Autologous Tissue Substitute",
    "PType": " Open Approach"
  }
];

const diagCodes: any[] = [
  {
    "Dcode": "A1814",
    "Description": " Tuberculosis of prostate"
  },
  {
    "Dcode": "C9150",
    "Description": " Adult T-cell lymph/leuk (HTLV-1-assoc) not achieve remission"
  },
  {
    "Dcode": "C9151",
    "Description": " Adult T-cell lymphoma/leukemia (HTLV-1-assoc), in remission"
  }
];

const medicines: any[] = [
  {
    "ApplNo": "00",
    "ProductNo": "00",
    "Form": "NA",
    "Strength": "NA",
    "ReferenceDrug": "NA",
    "DrugName": "NA",
    "ActiveIngredient": "NA",
    "ReferenceStandard": "NA"
  },
  {
    "ApplNo": "4",
    "ProductNo": "4",
    "Form": "SOLUTION/DROPS;OPHTHALMIC",
    "Strength": "1%",
    "ReferenceDrug": "0",
    "DrugName": "PAREDRINE",
    "ActiveIngredient": "HYDROXYAMPHETAMINE HYDROBROMIDE",
    "ReferenceStandard": "0"
  }
];

const allergies: any[] = [
  {
    "ID": "00",
    "allergyType": "NA",
    "allergyName": "NA",
    "Allergen Source": "NA",
    "Isoforms or partial sequences of allergen": "NA",
    "Allerginicity": "NA"
  },
  {
    "ID": "Bos d 2.0101",
    "allergyType": "Animal",
    "allergyName": "Bovine",
    "Allergen Source": "Bos taurus",
    "Isoforms or partial sequences of allergen": "Bos Bos d 2",
    "Allerginicity": "IgE but no biological test"
  }
];

const tickets: any[] = [
  {
    "title": "RM0003 - CT scan machine required",
    "body": "Room number - 0003 required CT scan machine, existing machine requires some repairing.",
    "username": 1,
    "uname": "Dr.Andrew Bert",
    "status": "approve",
    "raisedDate": "2021-12-01T15:31:18.438Z"
  },
  {
    "title": "RM0004 - Bathroom door is broken",
    "body": "Room number 004 having a bathroom there door is broken from past 10 days",
    "username": 2,
    "uname": "Dr.Andrew Bert",
    "status": "approve",
    "raisedDate": "2021-12-01T17:31:39.463Z"
  }
];

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:  [RegistrationService]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new RegistrationService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<any[]> to get data from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(registrationDetails));

    service.getData().subscribe(
      (resData) => {
        expect(resData).toEqual(registrationDetails);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data by username from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(registrationDetails));

    service.getDataById("admin").subscribe(
      (resData) => {
        expect(resData).toEqual(registrationDetails);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should perform post operation to add a new user record on server',   ( done ) => {

    let obj:any = { "firstname": "Rahul",
    "lastname": "Shukla",
    "dob": "12/08/1987",
    "username": "RahulS",
    "role": "patient",
    "email": "rahul.s@example.com",
    "phone": "9839987733",
    "userpass": "admin123",
    "isActive": "Y",
    "id": 6,
    "demographics": {},
    "sceduledAppointments": [],
    "immunization": [],
    "allergies": [],
    "currentMedications": []   };
    httpClientSpy.post.and.returnValue(of(obj));

    service.addPerson(obj).subscribe(
      (resData:any) => {
        expect(resData).toEqual(obj);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for physicians from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(physicianData));

    service.getPhysicianData().subscribe(
      (resData) => {
        expect(resData).toEqual(physicianData);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for physicians by username from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(physicianData));

    service.getPhysicianDataById("Dr.Andrew Bert").subscribe(
      (resData) => {
        expect(resData).toEqual(physicianData);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should perform put operation to update user active flag on server',   ( done ) => {

    let obj:any = { "isActive": "N",
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
    "userpass": "login123"  };
    httpClientSpy.put.and.returnValue(of(obj));

    service.updateActiveStatus("Dr.John Quil", obj).subscribe(
      (resData:any) => {
        expect(resData).toEqual(obj);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.put.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for procedure codes from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(proCodes));

    service.getProcedureCodesData().subscribe(
      (resData) => {
        expect(resData).toEqual(proCodes);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for diagnosis codes from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(diagCodes));

    service.getDaignosisCodesData().subscribe(
      (resData) => {
        expect(resData).toEqual(diagCodes);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for medicine codes from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(medicines));

    service.getMedicinesData().subscribe(
      (resData) => {
        expect(resData).toEqual(medicines);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for allergies from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(allergies));

    service.getAllergiesData().subscribe(
      (resData) => {
        expect(resData).toEqual(allergies);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should return an Observable<any[]> to get data for tickets from server',   ( done:DoneFn ) => {

    httpClientSpy.get.and.returnValue(of(tickets));

    service.getTickets().subscribe(
      (resData) => {
        expect(resData).toEqual(tickets);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1);

  });

  it('should perform post operation to add a new ticket on server',   ( done ) => {

    let obj:any = {
      "title": "RM0004 - Need a new xray machine",
      "body": "Room number 004 needs a new xray machine",
      "username": 3,
      "uname": "Dr.Andrew Bert",
      "status": "approve",
      "raisedDate": "2021-12-07T17:31:39.463Z"
    };
    httpClientSpy.post.and.returnValue(of(obj));

    service.logTicket(obj).subscribe(
      (resData:any) => {
        expect(resData).toEqual(obj);
        done();
      },
      done.fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1);

  });
});
