import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService {

  constructor(private router: Router) { }
  public canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean
  {
    console.log("Message from AuthGuardService - canActivate Method");

    if( sessionStorage.getItem("userData")  == null )
    {
     
      // invalid user
      //  redirect to login
      this.router.navigate(["login"]);
      return false;
    }
    else
    {
      // valid user
      return true;
    }
  }
}
