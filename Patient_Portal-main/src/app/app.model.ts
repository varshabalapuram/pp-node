export class Appointments {
    isActive:boolean=false;
    username:string="";
    desc:string="";
    type:string="";
    location: string='';
    profile_pic: string='';
    overview:string="";
    patientsDetails:PatientsDetails[]=[];
    sceduledAppointments:any[]=[];

   
}
export class PatientsDetails{
schedule_time?:any;
currentmedication?:any;
pluseRate?:string
    username?:string;
    patientDob?:string;
    weight?:number;
    height?:number;
    address?:string;
    contactNumber?:string;
    email?:string;
    bloodPressure?:string;
    pulseRate?:string;
    notes?:string;
    Medication?:string;
    Allergies?:string;
    allDay?:string;
    type?:string;
    reports?:string;
    gender?:string;
    age?:string;
    dob?:string;
    phoneNo?:string;
    visitDetails?:VisitDetails;
    currentMedications?:currentmedication[]
    immunization?:immunization[]
    allergies?:Allergies[]
}
export class currentmedication{
    drugName?:string;
   drugStrength?:string;
    drugForm?:string;
}
export class immunization{
    vaccine?:string;
     vaccinateddate?:string;
     noofdozes?:string;
}


export class Allergies{
    allergyName?:string;
    allergyType?:string;
    allerginicity?:string;
}
export class PhysicianSpecialist {
    username:string="";
    desc:string="";
    id:number=0;
    type:string="";
    location:string="";
    profile_pic:string="";
    overview:string="";
    sceduledAppointments?:any;
}


export class VisitDetails{
    vitalsDetails?:VitalsDetails
    procedureDetails?:ProcedureDetails
    ordersDetails?:OrdersDetails
}

export class VitalsDetails{
    bloodPressure?:string;
    bodyTemprature?:string;
    height?:string;
    pulseRate?:string;
    weight?:string;
}
export class ProcedureDetails{
    diagnosisCode:any[]=[];
    procedureCode:any[]=[];
    
}export class OrdersDetails{
    labReports:any[]=[];
    medications:any[]=[];
    radiologyReports:any[]=[];
}



// isActive:boolean=false;
//     doc_name:string="";
//     doc_id:number=0;
//     patient_id:number=0;
//     Date_time?:Date;
//     patientsDetails:PatientsDetails[]=[];