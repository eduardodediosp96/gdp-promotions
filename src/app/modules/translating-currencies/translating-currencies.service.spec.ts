import { TestBed } from '@angular/core/testing';

import { TranslatingCurrenciesService } from './translating-currencies.service';

describe('TranslatingCurrenciesService', () => {
  let service: TranslatingCurrenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingCurrenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
