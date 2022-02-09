import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  getLoginData(loginData: any) {
    // return this.http.get<UserDetails[]>('http://localhost:3000/users');
    console.log('hereee');
    return this.http.post<any>('/api/users/login', loginData);
  }
}
