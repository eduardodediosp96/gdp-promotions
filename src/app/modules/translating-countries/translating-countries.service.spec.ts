import { TestBed } from '@angular/core/testing';

import { TranslatingCountriesService } from './translating-countries.service';

describe('TranslatingCountriesService', () => {
  let service: TranslatingCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
