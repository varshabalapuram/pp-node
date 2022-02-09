import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAptHistoryComponent } from './patient-apt-history.component';

describe('PatientAptHistoryComponent', () => {
  let component: PatientAptHistoryComponent;
  let fixture: ComponentFixture<PatientAptHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAptHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAptHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
