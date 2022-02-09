import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../login/login.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboordService {

  constructor(private http: HttpClient) { }
  getPhysicianData() {
    let configUrl = '/api/physician/get-physician';

    return this.http.get<any>(configUrl);

  }

  addPhysician(physican:UserDetails): Observable<any> {
    const headers = { 'Content-Type': 'application/json'}  
    const body=JSON.stringify(physican);
    // console.log(body)
    return this.http.post('api/physician/add-physician', body,{'headers':headers});
  }


  updateActiveStatus(id: any, body: any) {
    console.log(id)
    return this.http.put<any>('api/users/updateFlag'+ '/' + id, body);
  }
}
