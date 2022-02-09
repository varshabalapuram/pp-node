import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  PatternValidator,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  Appointments,
  PatientsDetails,
  PhysicianSpecialist,
} from '../app.model';
import { UserDetails } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { RegistrationService } from '../registration/registration.service';

@Component({
  selector: 'app-scedule-appointment',
  templateUrl: './scedule-appointment.component.html',
  styleUrls: ['./scedule-appointment.component.css'],
})
export class SceduleAppointmentComponent implements OnInit {
  date10: any = '';
  doctor_type: string = 'Physician';
  location: string = '';
  sucess: boolean = false;
  show_physician: boolean = true;
  show_filter: boolean = true;
  Doctors_temp: PhysicianSpecialist[] = [];
  Doctors: PhysicianSpecialist[] = [];
  show_phy_confirmation: boolean = false;
  Appointed_doctor: Appointments;
  type: string = '';
  // Appointed_doctor: any;

  Locations: string[] = [];
  classTimingsArray: any[] = [];
  minDate: any;
  maxDate: any;
  invalidDates: any;
  showerror: boolean = false;
  selected_Doctor: PhysicianSpecialist;
  userDetail: any;
  notes: string = '';
  dept_selected = '';
  show_dept_filter: boolean = true;

  patientForm: FormGroup = new FormGroup({
    notes: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });
  errormsg: string = '';

  constructor(
    private registrationService: RegistrationService,
    private messageService: MessageService,
    private router: Router,
    public loginService: LoginService
  ) {
    this.Locations = ['California', 'Florida', 'Mexico', 'California', 'None'];
    this.Appointed_doctor = new Appointments();
    this.selected_Doctor = new PhysicianSpecialist();
  }

  ngOnInit(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Success',
      detail: 'Please fill the demographics before ',
    });

    let use = JSON.parse(sessionStorage.getItem('userData') || '');
    this.userDetail = use.data;
    this.getPhysicianData();
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth + 1);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  getPhysicianData() {
    this.registrationService.getPhysicianData().subscribe((data: any) => {
      this.Doctors = data.physicianDetails;
      this.Doctors_temp = data.physicianDetails;
      console.log(
        '--------------------------------------------------------------------------------------------'
      );

      console.log(this.Doctors);
      console.log(
        '--------------------------------------------------------------------------------------------'
      );

      console.log(this.Doctors_temp);

      this.Doctors.forEach((item) => {
        // if(!item.hasOwnProperty('profile_pic')){
        item.profile_pic =
          'https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg';
        // }
      });
    });
  }

  onButtonGroupClick($event: any) {
    let clickedElement = $event.target || $event.srcElement;
    console.log(clickedElement);
    this.dept_selected = clickedElement.value;
    console.log(this.dept_selected);

    if (clickedElement.nodeName === 'input') {
      let isCertainButtonAlreadyActive =
        clickedElement.parentElement.querySelector('.active');
      // if a Button already has Class: .active
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }

      clickedElement.className += ' active';
    }
  }

  onSelect($event: any) {
    let date = new Date($event);
    let hour = new Date($event).getHours();
    let min = new Date($event).getMinutes();
    this.date10 = `${date}`;
    // this.date10 = new Date($event)
    console.log(this.date10);
  }
  bookedAppoitment() {
    let pData = JSON.parse(sessionStorage.getItem('userData') || '');
    this.userDetail = pData.data;
    let selected_date = new Date(this.date10);
    if (Object.keys(this.userDetail.demographics).length > 0) {
      if (this.date10 != '' && this.notes != '' && this.type != '') {
        let patientDetails: any = {
          notes: this.notes,
          schedule_time: this.date10,
          type: this.type,
          patient_id: this.userDetail._id,
        };
        let id = this.selected_Doctor.username;

        this.registrationService
          .addAppointmentData(id, patientDetails)
          .subscribe((data: any) => {
            console.log(data);

            if (data && data.success == true) {
              console.log(data);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Scheduled Appointment',
              });
              this.sucess = true;
              this.show_phy_confirmation = false;
              this.show_filter = false;
              this.show_dept_filter = false;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: data.msg,
              });
            }

            // if (data && data.username != "") {
            //   this.registrationService.updateDemographics(this.userDetail.username, this.userDetail).subscribe((data: UserDetails) => {
            //     if (data && data.username != '') {
            //       sessionStorage.removeItem('userData');
            //       this.loginService.getLoginData(this.userDetail.username).subscribe((data: UserDetails) => {
            //         this.userDetail = data;
            //         sessionStorage.setItem('userData', JSON.stringify(this.userDetail));
            //         if (this.userDetail) {
            //           if (this.userDetail.userpass != '' && this.userDetail.isActive == 'Y') {
            //             this.sucess = true;
            //           }

            //         }
            //       });
            //     }
            //   })
            // }
          });
      } else {
        this.errormsg = 'please select the date';
        this.showerror = true;
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill the demographics details',
      });

      setTimeout(() => {
        this.router.navigate(['/demographics']);
      }, 5000);
    }
    // this.userDetail = JSON.parse(sessionStorage.getItem('userData') || '');

    // let valid_patient_date = true;
    // let valid_physician_date = true
    // let selected_date = new Date(this.date10)
    // this.selected_Doctor.sceduledAppointments?.forEach((element: any) => {
    //   let each_date = new Date(element)
    //   if ((each_date.getDate() == selected_date.getDate()) && (each_date.getMonth() == selected_date.getMonth()) && (each_date.getHours() == selected_date.getHours())) {
    //     valid_physician_date = false
    //   }
    // });
    // this.userDetail.sceduledAppointments.forEach((element: any) => {
    //   let user_eachdate = new Date(element.dateAndTime)
    //   console.log("each", user_eachdate)
    //   if ((user_eachdate.getDate() == selected_date.getDate()) && (user_eachdate.getMonth() == selected_date.getMonth()) && (user_eachdate.getHours() == selected_date.getHours())) {
    //     console.log("asljdalksjdlkajsdlksa")
    //     valid_patient_date = false
    //   }
    // });
    // console.log("valid_patient_date", valid_patient_date)
    // console.log("valid_physician_date", valid_physician_date)

    // if (Object.keys(this.userDetail.demographics).length > 0) {
    //   if (this.date10 != "" && this.notes != '' && this.type != '') {
    //     if (!valid_patient_date) {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You have already have an appointment on the same date.request you to select an other time/date' });
    //     }
    //     else if (!valid_physician_date) {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The selected data/time for the selected physician is blocked. Request you to please select  a different time/date' });
    //     }
    //     else if (valid_patient_date && valid_physician_date) {

    //       let patientDetails = new PatientsDetails();
    //       patientDetails = { ...this.userDetail.demographics };
    //       patientDetails.currentMedications = [...this.userDetail.currentMedications]
    //       patientDetails.allergies = [...this.userDetail.allergies]
    //       patientDetails.immunization = [...this.userDetail.immunization]

    //       patientDetails.notes = this.notes;
    //       patientDetails.schedule_time = this.date10;
    //       patientDetails.type = this.type;
    //       this.Appointed_doctor.patientsDetails.push(patientDetails);
    //       console.log("patientDetails");

    //       console.log(patientDetails);
    //       console.log("this.Appointed_doctor");

    //       console.log(this.Appointed_doctor);

    //       this.show_phy_confirmation = false;
    //       this.show_filter = false;
    //       this.show_dept_filter = false;
    //       this.Appointed_doctor.username = this.selected_Doctor.username;
    //       this.Appointed_doctor.sceduledAppointments.push(this.date10);
    //       let dataPhy = {
    //         physicianName: '',
    //         dateAndTime: '',
    //         type: ''
    //       }
    //       dataPhy.dateAndTime = this.date10;
    //       dataPhy.physicianName = this.Appointed_doctor.username;
    //       dataPhy.type = this.type;
    //       this.userDetail.sceduledAppointments?.push(dataPhy);

    //       this.Appointed_doctor.isActive = false;
    //       let id = this.Appointed_doctor.username;
    //       this.registrationService.addAppointmentData(id, this.Appointed_doctor).subscribe((data: any) => {
    //         console.log(data);
    //         if (data && data.username != "") {
    //           this.registrationService.updateDemographics(this.userDetail.username, this.userDetail).subscribe((data: UserDetails) => {
    //             if (data && data.username != '') {
    //               sessionStorage.removeItem('userData');
    //               this.loginService.getLoginData(this.userDetail.username).subscribe((data: UserDetails) => {
    //                 this.userDetail = data;
    //                 sessionStorage.setItem('userData', JSON.stringify(this.userDetail));
    //                 if (this.userDetail) {
    //                   if (this.userDetail.userpass != '' && this.userDetail.isActive == 'Y') {
    //                     this.sucess = true;
    //                   }

    //                 }
    //               });
    //             }
    //           })
    //         }

    //       });
    //     }
    //   }
    //   else {
    //     this.errormsg = "please select the date"
    //     this.showerror = true;
    //   }
    // }
    // else {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the demographics details' });

    //   setTimeout(() => {
    //     this.router.navigate(['/demographics'])
    //   }, 5000);
    // }
  }
  filter_by_location() {
    if (this.location == 'None') {
      this.Doctors_temp = this.Doctors;
    } else {
      this.Doctors_temp = this.Doctors.filter(
        (item) => item.location == this.location
      );
    }
  }
  schedule_appointment(sel_doctor: any) {
    console.log(sel_doctor);
    this.show_physician = false;
    this.show_phy_confirmation = true;
    this.selected_Doctor = sel_doctor;
    this.show_filter = false;
    this.date10 = '';
    // this.Appointed_doctor.username = sel_doctor.username;
    // this.Appointed_doctor.desc = sel_doctor.desc;
    // this.Appointed_doctor.type = sel_doctor.type;
    // this.Appointed_doctor.location = sel_doctor.location;
    // this.Appointed_doctor.profile_pic = sel_doctor.profile_pic;
    // this.Appointed_doctor.overview = sel_doctor.overview;
    // this.Appointed_doctor.patientsDetails = sel_doctor.patientsDetails;
    // this.Appointed_doctor.sceduledAppointments = sel_doctor.sceduledAppointments;
    console.log('sajdfcedjsabhfcis');

    console.log(this.Appointed_doctor);
    console.log('this.selected_Doctor.userdeatilssss');

    //console.log(this.selected_Doctor.sceduledAppointments);
    console.log(this.userDetail);
    let patientDetails12 = new PatientsDetails();
    console.log('paosd');
    console.log(patientDetails12);
  }
  // showdate(){
  //   console.log("heresdsdf")

  //   console.log(this.date10)
  // }
  Display_cards(type: string) {
    console.log('typetypetype  ' + type);

    this.doctor_type = type;
    this.show_physician = true;
    this.show_phy_confirmation = false;
    this.sucess = false;
    this.show_filter = true;
  }
}
