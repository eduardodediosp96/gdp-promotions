import { TestBed } from '@angular/core/testing';

import { TranslatingKeysService } from './translating-keys.service';

describe('TranslatingKeysService', () => {
  let service: TranslatingKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
