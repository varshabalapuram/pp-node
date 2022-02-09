import { TestBed } from '@angular/core/testing';

import { DashboordService } from './dashboord.service';

describe('DashboordService', () => {
  let service: DashboordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
