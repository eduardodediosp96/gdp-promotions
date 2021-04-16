import { TestBed } from '@angular/core/testing';

import { CryptoCoinsService } from './crypto-coins.service';

describe('CryptoCoinsService', () => {
  let service: CryptoCoinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoCoinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
