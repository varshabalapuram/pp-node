import { Injectable } from '@angular/core';
import { ImmunizationComponent } from './immunization/immunization.component';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DeactivategaurdService {

  constructor() { }
  canDeactivate(component:ImmunizationComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState: RouterStateSnapshot) : boolean {

return component.canExit();

}
}
