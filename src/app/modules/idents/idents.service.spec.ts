import { TestBed } from '@angular/core/testing';

import { IdentsService } from './idents.service';

describe('IdentsService', () => {
  let service: IdentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
