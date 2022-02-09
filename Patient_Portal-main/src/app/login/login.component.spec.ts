import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '../app-routing.module';
import { RegistrationService } from '../registration/registration.service';
import { By } from '@angular/platform-browser';
import { LoginService } from './login.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router:Router;
  let loginService: LoginService;
  let registrationService:RegistrationService;
  let messageService: MessageService;
  let loginSerivespy: { getLoginData: jasmine.Spy };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports :  [FormsModule,HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)],
      providers:[MessageService,RegistrationService, { provide : LoginService, useValue : loginSerivespy}]

    })
    .compileComponents();
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    loginService = TestBed.inject(LoginService)
    registrationService = TestBed.inject(RegistrationService)
    messageService = TestBed.inject(MessageService)
    loginSerivespy = jasmine.createSpyObj('LoginService', ['getLoginData']);
    router.initialNavigation();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });


  it('should msg property contains empty value as defualt value', () => {

    const strOutput:string  = component.msg;

    expect(strOutput).toBe("");
  });

  it('should return an login data',  () => {
  
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => {
      loginService.getLoginData(component.userDetails.username).subscribe(resData => {
        console.log("he",resData)
       expect(resData).toBeTruthy();
      })
      

    });

 });

 it('should be empty session in  Login', fakeAsync(() => {

  if(sessionStorage.getItem("userData") == null)
  {
      router.navigate(["/login"]).then(  () =>
      {
        expect(location.path()).toBe('/login');
        tick(3000);
      });
  }

}));

it('if router is login session should be empty  ', fakeAsync(() => {

  if(location.path()=="/login")
  {
    expect(sessionStorage.getItem('userData')).toBe('')
  }


}));



  it('should result contains "Invalid user id or password" for empty uid and pwd', () => {
    component.validDetails(component.userDetails);
    component.userDetails.username = '';
    component.userDetails.userpass= '';
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
  
    fixture.whenStable().then(() => {
      expect(component.validDetails).toHaveBeenCalled();
      expect( component.msg).toBe("Invalid user id or password");

    });
  });

  // it('should result contains "Welcome to Admin" for valid user credentials', () => {

  //   // Action
  //   component.userDetails.username = 'admin';
  //   component.userDetails.userpass= 'admin123';
  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();

  //   // Assert
  //   expect(component.msg).toBe("Welcome to Admin");
  // });

    });
