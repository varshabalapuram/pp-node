import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDept'
})
export class FilterDeptPipe implements PipeTransform {

  transform(input:any[], filterValue:any): any[]
  {
     let output:any[] = [];
     console.log(input)
     if(filterValue=="all" || filterValue==""){
      output=input
     }else{
     output =   input.filter( item =>item["desc"].indexOf(filterValue)>-1 );
   
   }
   return output;

}

}
