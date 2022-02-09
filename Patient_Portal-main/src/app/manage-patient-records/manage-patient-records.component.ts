import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration/registration.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-manage-patient-records',
  templateUrl: './manage-patient-records.component.html',
  styleUrls: ['./manage-patient-records.component.css']
})
export class ManagePatientRecordsComponent implements OnInit {


  displayBasic:boolean = false;
  patientDetails:any[]=[];
  totalRecords: any=0;
  displayDetails:boolean = false;
  data:any; 
  patientDemographic:any;
  constructor(private registrationService: RegistrationService) { 
   
  }

  ngOnInit(): void {
    
  this.registrationService.getData().subscribe((data: any) => {
    
   this.patientDetails =  data;
  if( this.patientDetails)
   this.patientDetails = data.filter(function (d: any) {
    return d.role.toLowerCase() == 'patient' 
  });
   this.totalRecords = this.patientDetails.length;
  });

  }
  back(){
    this.displayDetails = false;
  }

  popUp(){
     this.displayBasic =true
    this.displayDetails = true;
   // this.data =data;
  }
 
  viewDetails(details:any){
    //this.displayBasic =true
    this.patientDemographic = details;
    this.displayDetails = true;
  }


  // exportExcel(data:any) {
  //   import("xlsx").then(xlsx => {
  //     const worksheet = xlsx.utils.json_to_sheet(data);
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //     const excelBuffer: any = xlsx.write(workbook, {
  //       bookType: "xlsx",
  //       type: "array"
  //     });
  //     this.saveAsExcelFile(excelBuffer, "products");
  //   });
  // }
  // saveAsExcelFile(buffer: any, fileName: string): void {
  //   import("file-saver").then(FileSaver => {
  //     let EXCEL_TYPE =
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  //     let EXCEL_EXTENSION = ".xlsx";
  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE
  //     });
  //     FileSaver.saveAs(
  //       data,
  //       fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
  //     );
  //   });
  // }

  
}

