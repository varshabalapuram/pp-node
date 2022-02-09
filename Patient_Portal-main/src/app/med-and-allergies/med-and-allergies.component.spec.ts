import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedAndAllergiesComponent } from './med-and-allergies.component';

describe('MedAndAllergiesComponent', () => {
  let component: MedAndAllergiesComponent;
  let fixture: ComponentFixture<MedAndAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedAndAllergiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedAndAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
