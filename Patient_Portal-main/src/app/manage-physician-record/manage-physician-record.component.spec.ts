import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhysicianRecordComponent } from './manage-physician-record.component';

describe('ManagePhysicianRecordComponent', () => {
  let component: ManagePhysicianRecordComponent;
  let fixture: ComponentFixture<ManagePhysicianRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePhysicianRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhysicianRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
