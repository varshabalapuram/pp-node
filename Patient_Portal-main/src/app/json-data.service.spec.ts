import { TestBed } from '@angular/core/testing';

import { CustomerService } from './json-data.service';

describe('JsonDataService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
