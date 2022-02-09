import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceduleAppointmentComponent } from './scedule-appointment.component';

describe('SceduleAppointmentComponent', () => {
  let component: SceduleAppointmentComponent;
  let fixture: ComponentFixture<SceduleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SceduleAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SceduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
