import { TestBed } from '@angular/core/testing';

import { CallingCodesService } from './calling-codes.service';

describe('CallingCodesService', () => {
  let service: CallingCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallingCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
