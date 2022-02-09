import { TestBed } from '@angular/core/testing';

import { DeactivategaurdService } from './deactivategaurd.service';

describe('DeactivategaurdService', () => {
  let service: DeactivategaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeactivategaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
