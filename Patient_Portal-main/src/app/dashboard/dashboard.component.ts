import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CalendarOptions } from '@fullcalendar/angular';
import { Message } from 'primeng/api';
import { Appointments, PhysicianSpecialist } from '../app.model';
import { CustomerService } from '../json-data.service';
import { Customer } from '../patients';
import { RegistrationService } from '../registration/registration.service';
// import { jsPDF } from "jspdf";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { DashboordService } from './dashboord.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  dailyData: any;
  pieOptions: any;
  weeklyData: any;
  monthlyData: any;
  addClassTo: string = 'monthly';
  defaultClass: string = '';
  registeredFlag: boolean = false;
  checkedIDs: any[] = [];
  registeredUsers!: Customer[];
  newUsers!: Customer[];
  scrollableCols: any[] = [];
  isChecked: string = 'false';
  loginData: any[] = [];
  approvedUsers: any;
  approvedUsersFlag: boolean = false;
  patientData: any;

  physicianData?: any;

  status?: string;
  blood_pressure: any;
  pulse_rate: any;
  current_medication: string = ""
  Events: any[] = [];
  physicianInfo: any = {};
  patientInfo: any = {};

  calendarOptions?: CalendarOptions



  activePhysician: any[] = [];
  postActivePhysician: any[] = [];
  registeredPatientFlag: boolean = false;
  appointmentsFlag: boolean = false;
  userDetail: any;
  isActive: string = 'N';
  registeredPatients: any;

  appointmentData: any[] = [];
  reports: any;
  position: string = "";
  msgs: Message[] = [];
  Doctors_temp: any;

  completedAppointments: any;
  pendingAppointments: any[] = [];
  basicOptions: any;
  totalRegPhysicianDec: any;
  totalRegPatientsDec: any;
  totalRegPhysicianNov: any;
  totalRegPatientsNov: any;
  RegPhysician: any;
  RegPatients: any;
  data: any
  decemberApp: number = 0;
  NovemberApp: number = 0;
  topRatedDoctor: any = [];
  totalVisited: number = 0

  projectcount:number = 0;
  //same process
  accuratecount:number = 0;
  clientcount:number = 0;
  customerfeedback:number = 0;

  //we have created setinterval function with arrow function and
  //and set them in a variable that is projectcountstop.
  
  projectcountstop:any = setInterval(()=>{
    this.projectcount++;
    //we need to stop this at  particular point; will use if condition
    if(this.projectcount ==287)
    {
      //clearinterval will stop tha function
      clearInterval(this.projectcountstop);
    }

  },30) //10 is milisecond you can control it


  accuratecountstop:any = setInterval(()=>{
    this.accuratecount++;
    if(this.accuratecount == 200)
    {
      
      clearInterval(this.accuratecountstop);
    }
  },30) 


  clientcountstop:any = setInterval(()=>{
    this.clientcount++;
    if(this.clientcount == 300)
    {
      
      clearInterval(this.clientcountstop);
    }
  },30)

  customerfeedbackstop:any = setInterval(()=>{
    this.customerfeedback++;
    if(this.customerfeedback == 100)
    {
      
      clearInterval(this.customerfeedbackstop);
    }
  },30)




  constructor(
    private customerService: CustomerService,
    public router: Router,
    private registrationService: RegistrationService,
    private http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dashboardservice:DashboordService
  ) {

  }
  

  ngOnChanges() { }

  ngOnInit() {

    let use = JSON.parse(sessionStorage.getItem('userData') || '');
    this.patientData=use.data
    console.log("dahsborddddd", this.patientData)
    this.registered();
    this.dashboardservice.getPhysicianData().subscribe((data: any) => {
      console.log("kgvgtcvtgf");

      console.log(data)

      this.Doctors_temp = data.physicianDetails
      this.Doctors_temp.forEach((item:any) => {
        // if(!item.hasOwnProperty('profile_pic')){
        item.profile_pic = "https://image.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
        // }
      })
    })


    if (this.patientData.role != 'Physician') {
      this.status = (new Date(this.patientData.demographics.schedule_time) > new Date()) ? "onGoing" : "Completed";
      this.blood_pressure = (this.patientData.demographics.bloodPressure != "") ? this.patientData.demographics.bloodPressure : "N/A"
      this.pulse_rate = (this.patientData.demographics.pluseRate != "") ? this.patientData.demographics.pluseRate : "N/A"

      this.current_medication = (this.patientData.medication?.currentmedication != "") ? this.patientData.medication?.currentmedication?.split(",") : "N/A"

    } else {
      this.registrationService.getPhysicianDataById(this.patientData.username).subscribe((data: any) => {
        console.log("jjjjjjjjjjjjjjjjjjjjjjj");


        this.physicianInfo = data;
        console.log(this.physicianInfo);

        this.patientInfo = data.patientsDetails
        console.log("this.patientInfothis.patientInfothis.patientInfo");
        console.log(this.patientInfo);



        console.log("data");

        console.log();


        this.patientInfo.forEach((element: any) => {
          let date = new Date(element.schedule_time);
          let getdate = date.getFullYear() + "-" + String((date.getMonth()) + 1) + "-" + date.getDate();

          let iteam = {
            title: "",
            start: ""
          };
          // console.log(getdate+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
          console.log();




          iteam.title = "Appointment with " + element.username;
          // iteam.start =  getdate+"T"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
          iteam.start = date.toISOString();

          this.Events.push(iteam);

        });
        // this.Events = [




        //   {title: `Appointment with ${this.patientInfo[2].patient_name}`, date: date }
        // ]
      });
    }


    this.scrollableCols = [
      { field: 'name', header: 'Name' },
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' },
    ];


    let s1: any = "ad";
    let s2: Object = "as";

    // var calendarEl:any = document.getElementById('calendar');
    // var calendar = new Calendar(calendarEl, {
    //   windowResize: function(view) {
    //     alert('The calendar has adjusted to a window resize');
    //   }
    // });

    setTimeout(() => {
    

      this.dailyData = {
        labels: ['Completed Appointments', 'Pending Appointments'],
        datasets: [
            {
                data: [this.completedAppointments? this.completedAppointments.length:0, this.pendingAppointments ? this.pendingAppointments.length:0],
                backgroundColor: [
                  '#FFC107','#55b3c8'
                    
                ],
                hoverBackgroundColor: [
                  '#FFE082',  '#a2bce6'
                ]
            }]    
        };
    
  
      this.monthlyData = {
        labels: [
        
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Patient Appointments',
            data: [10, 11, 13, 5, this.NovemberApp, this.decemberApp],
            backgroundColor: ['#55b3c8'],
            hoverBackgroundColor: ['#a2bbe6'],
          },
        ],
      };
    
  
   
      this.RegPhysician = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Registered Physicians',
                data: [2, 3, 0, 4,  this.totalRegPhysicianNov.length, this.totalRegPhysicianDec.length],
                fill: true,
                borderColor: '#42A5F5',
                tension: .4
            }
            
        ]
    };
  
    this.RegPatients = {
      labels: ['July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'Registered Patients',
              data: [0, 1, 5, 3, this.totalRegPatientsNov.length, this.totalRegPatientsDec.length],
              fill: true,
              borderColor: '#42A5F5',
              tension: .4
          }
          
      ]
  };
  this.basicOptions = {
    responsive: false,
    maintainAspectRatio: false
  
  };
  },400);
   
  


    setTimeout(() => {
      console.log(this.Events);

      this.calendarOptions = {

        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,listDay,timeGridWeek,timeGridDay'
        },


        events: this.Events


        // [  { title: 'event 1', date: '2021-12-01' },
        // { title: 'event 2', date: '2021-12-06' }]
      };
    }, 2000);











  }



  // getPhysicianData()
  // {
  //   this.registrationService.getPhysicianDataById(this.patientData.username).subscribe(data=>{



  //   })
  // }

  // registered()
  // {
  //   this.registrationService.getData().subscribe((data: any) => {
  //     let userData = data;
  //     console.log('data');

  //     console.log(data);

  //     this.registeredUsers = userData.filter(function (d: any) {
  //       return d.isActive == 'N';
  //     });

  //     this.registeredFlag = false;

  //     this.approvedUsers = data.filter(function (d: any) {
  //       return d.isActive == 'Y';
  //     });

  //     this.approvedUsersFlag =false;

  //   });

  // }

  // getTabName(tabName: any): void {
  //   if (tabName == 'daily') {
  //     this.addClassTo = 'daily';
  //   }
  //   if (tabName == 'weekly') {
  //     this.addClassTo = 'weekly';
  //   }
  //   if (tabName == 'monthly') {
  //     this.addClassTo = 'monthly';
  //   }
  // }

  // newUserRequest(): void {
  //   this.registrationService.getData().subscribe((data: any) => {
  //     data = data.filter(function (d: any) {
  //       return d.isActive == 'N';
  //     });
  //     this.registeredUsers = data;
  //     this.registeredFlag = true;
  //   });
  // }

  setUserStatus() {
    for (var i = 0; i < this.loginData.length; i++) {
      this.registrationService.addLoginData(this.loginData[i]).subscribe((Response: any) => {

      });

    }
    this.registrationService.getData().subscribe((data: any) => {
      data = data.filter(function (d: any) {
        return d.isActive == 'Y';
      });
      this.approvedUsers = data;
    });
    // alert("User status has been updated successfully!!");
    this.messageService.add({severity:'success', summary: 'Success', detail: 'User has been approved successfully'});
    this.newUserRequest();
  }

  getActiveUser(id: any, event: any) {
    this.registrationService.getDataById(id).subscribe((response: any) => {
      let userObj: any = {};

      userObj.username = response.username;
      userObj.password = response.password;
      userObj.id = response.id;
      userObj.role = response.role;

      if (event.target.checked) {
        this.loginData.push(userObj);
        response.isActive = 'Y';
      } else {
        var index = this.loginData.findIndex(function (o) {
          return o.id === id;
        });

        this.loginData.splice(index, 1);
        response.isActive = 'N';
      }
      let body: any = response;

      // this.registrationService.updateActiveStatus(id,body).subscribe();
      this.registrationService.updateActiveStatus(response.username, body).subscribe();



    });
  }

  // getApprovedUsers(){
  //   this.registrationService.getData().subscribe((data: any) => {
  //     data = data.filter(function (d: any) {
  //       return d.isActive == 'Y';
  //     });
  //     this.approvedUsers = data;
  //   });
  //   this.approvedUsersFlag =true;
  //   this.registeredFlag =false;
  // }


  getTabName(tabName: any): void {
    if (tabName == 'daily') {
      this.addClassTo = 'daily';
    }
   
    if (tabName == 'monthly') {
      this.addClassTo = 'monthly';
    }
  }

  newUserRequest(): void {
    this.registrationService.getData().subscribe((data: any) => {
      data = data.data.filter(function (d: any) {
        return d.isActive == 'N' && d.role.toLocaleLowerCase() == 'physician';
      });
      this.registeredUsers = data;
      this.registeredFlag = true;
      this.appointmentsFlag = false;
      this.registeredPatientFlag = false;
    });
  }

  updateActiveStatus() {

    for (var i = 0; i < this.activePhysician.length; i++) {
      this.dashboardservice.addPhysician(this.activePhysician[i]).subscribe((Response: any) => {

      });

    }
    this.registrationService.getData().subscribe((data: any) => {
      data = data.data.filter(function (d: any) {
        return d.isActive == 'Y';
      });
      this.approvedUsers = data;
    });
    if (this.isActive == 'N') {
     // alert("Kinldy select data to approve");
      this.messageService.add({severity:'error', summary: 'Approve Data Error', detail: 'Kindly select checkbox to approve physician'});
    }
    else {
      //alert("User status has been updated successfully!!");
      this.messageService.add({severity:'success', summary: 'Success', detail: 'User has been approved successfully'});
      this.newUserRequest();
    }
  }



  setActiveUser(id: any, event: any) {
    this.registrationService.getDataById(id).subscribe((res: any) => {
      console.log("res")
      console.log(res)
      let response=res.data
      if (event.target.checked) {
        response.isActive = 'Y';
        this.isActive = 'Y'
      } else {
        response.isActive = 'N';
        this.isActive = 'N'
      }
      let body: any = response;


      this.dashboardservice.updateActiveStatus(response.username, body).subscribe();

      let userObj: any = response;

      userObj.patientsDetails = [];
      userObj.sceduledAppointments = [];

      if (event.target.checked) {
        this.activePhysician.push(userObj);
        response.isActive = 'Y';
        this.isActive = 'Y'
      } else {
        var index = this.activePhysician.findIndex(function (o) {
          return o.id === id;
        });

        this.activePhysician.splice(index, 1);
        response.isActive = 'N';
        this.isActive = 'N'
      }



    });
  }

  getApprovedUsers(){
    this.registrationService.getData().subscribe((data: any) => {
      data = data.filter(function (d: any) {
        return (d.isActive == 'Y' || d.isActive == 'B') && d.role.toLocaleLowerCase() == 'physician';
      });
      this.approvedUsers = data;
    });
    this.approvedUsersFlag =true;
    this.registeredFlag =false;
    this.registeredPatientFlag = false;
    this.appointmentsFlag=false;
  }

  regPatients() {
    this.registeredFlag = false;
    this.approvedUsersFlag = false;
    this.registeredPatientFlag = true;
    this.appointmentsFlag = false;
  }


  getAppointments() {
    this.appointmentsFlag = true;
    this.registeredFlag = false;
    this.approvedUsersFlag = false;
    this.registeredPatientFlag = false;
  }

  printPage() {
    let newWin: any;
    let divToPrint: any = document.getElementById("tb");
    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }

  //  donwloadReport(){
  // let divToPrint:any = document.getElementById("tb");  
  // const doc = new jsPDF();

  // doc.text(divToPrint.innerHTML, 10, 10);
  // doc.save("appointments.pdf");


  //     var doc = new jsPDF('p', 'pt');
  // var elem = document.getElementById("tb");
  // var res = doc.autoTableHtmlToJson(elem);
  // doc.autoTable(res.columns, res.data);
  // doc.save("table.pdf");


  //  }

  confirm1(reportData: any, flag: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to ' + flag + " this request?",
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        reportData.status = flag;
        this.registrationService.updateReport(reportData.username, reportData).subscribe();
        this.registrationService.getReports().subscribe((data: any) => {
          this.reports = data.filter(function (d: any) {
            return d.status == "";
          });
        });
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  blockUser(id:any){
    this.registrationService.getDataById(id).subscribe((response: any) => {
      response.isActive = 'B';
      let body: any = response;
      this.registrationService.updateActiveStatus(response.username,body).subscribe();
      this.getApprovedUsers();
  });
  }
  
  unblockUser(id:any){
    this.registrationService.getDataById(id).subscribe((response: any) => {
      response.isActive = 'Y';
      let body: any = response;
      this.registrationService.updateActiveStatus(response.username,body).subscribe();
      this.getApprovedUsers();
  });
  }
  displayGraphicalView(){
    this.registeredFlag =false;
    this.approvedUsersFlag  =false;
    this.registeredPatientFlag  =false;
    this.appointmentsFlag =false;
  }
  

  registered() {
    console.log(new Date().getMonth());
    this.registrationService.getData().subscribe((data: any) => {
      let userData = data.data;
      this.totalVisited = data.length;
      
      this.totalRegPatientsDec = userData.filter(function (d: any) {
        return d.role.toLocaleLowerCase() == 'patient' && new Date(d.regDate).getMonth() == 11;
      });


      this.totalRegPhysicianDec = userData.filter(function (d: any) {

        return d.role.toLocaleLowerCase() == 'physician' && new Date(d.regDate).getMonth() == 11;
      });

      this.totalRegPatientsNov = userData.filter(function (d: any) {
        return d.role.toLocaleLowerCase() == 'patient' && new Date(d.regDate).getMonth() == 10;
      });


      this.totalRegPhysicianNov = userData.filter(function (d: any) {

        return d.role.toLocaleLowerCase() == 'physician' && new Date(d.regDate).getMonth() == 10;
      });

      this.registeredUsers = userData.filter(function (d: any) {

        return d.isActive == 'N' && d.role.toLocaleLowerCase() == 'physician';
      });

      this.registeredFlag = false;

      this.approvedUsers = data.data.filter(function (d: any) {
        return (d.isActive == 'Y' || d.isActive == 'B') && d.role.toLocaleLowerCase() == 'physician';
      });

      this.approvedUsersFlag = false;


      this.registeredPatients = data.data.filter(function (d: any) {
        return d.role.toLocaleLowerCase() == 'patient' && d.sceduledAppointments.length > 0;
      });
      this.registeredPatientFlag = false;

      this.dashboardservice.getPhysicianData().subscribe((data: any) => {
        // this.appointmentData = data.filter(function(d:any){

        // });
        // this.appointmentData = data[3].patientsDetails

        let appointmentData_tmp = data;



        let allAppointments: any[] = []
        for (var i = 0; i < appointmentData_tmp.length; i++) {
          for (var j = 0; j < appointmentData_tmp[i].patientsDetails.length; j++) {
            appointmentData_tmp[i].patientsDetails[j].doc_name = appointmentData_tmp[i].username

            if (appointmentData_tmp[i].patientsDetails[j].schedule_time) {
              var date = new Date(appointmentData_tmp[i].patientsDetails[j].schedule_time);

              appointmentData_tmp[i].patientsDetails[j].dateTime = date.toLocaleString().split(',')[0];
              appointmentData_tmp[i].patientsDetails[j].appointment_status = (new Date(appointmentData_tmp[i].patientsDetails[j].schedule_time) > new Date()) ? "onGoing" : "Completed";
              // this.appointmentData[i].status =
            }

            if (appointmentData_tmp[i].patientsDetails.length > 0) {

              let obj: any = {};
              obj.appointmentCount = appointmentData_tmp[i].patientsDetails.length;
              obj.type = appointmentData_tmp[i].type;
              obj.username = appointmentData_tmp[i].patientsDetails[j].doc_name;
              obj.location = appointmentData_tmp[i].location;
              obj.profile_pic = appointmentData_tmp[i].profile_pic;
              this.topRatedDoctor.push(obj);

              //console.log(this.topRatedDoctor)

              this.appointmentData.push(appointmentData_tmp[i].patientsDetails[j]);
              allAppointments.push(appointmentData_tmp[i].patientsDetails[j]);
            }
          }
          var dups: any = [];

          this.topRatedDoctor = this.topRatedDoctor.filter(function (el: any) {

            if (dups.indexOf(el.username) == -1) {
              dups.push(el.username);

              return true;
            }
            return false;

          });


          this.registrationService.appointmentsData = allAppointments;
        }
        this.topRatedDoctor = this.topRatedDoctor.filter(function (data: any) {
          return data.appointmentCount > 2
        })
        console.log(this.topRatedDoctor);


        this.appointmentData = this.appointmentData.filter(function (d: any) {
          var todaysDate = new Date();
          var getDate = new Date(d.dateTime)
          return getDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)


        })
        console.log(this.appointmentData);


        this.pendingAppointments = this.appointmentData.filter(function (d: any) {
          return d.appointment_status.toLocaleLowerCase() == 'ongoing';
        })

        this.completedAppointments = this.appointmentData.filter(function (d: any) {
          return d.appointment_status.toLocaleLowerCase() == 'completed';
        })


        for (var i = 0; i < this.registrationService.appointmentsData.length; i++) {
          if (allAppointments[i].dateTime.split('/')[0] == '12') {
            this.decemberApp++;
          }
          else if (allAppointments[i].dateTime.split('/')[0] == '11') {
            this.NovemberApp++;
          }

        }


      });



    });



  }




}













