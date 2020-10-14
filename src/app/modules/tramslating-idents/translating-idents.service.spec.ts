import { TestBed } from '@angular/core/testing';

import { TranslatingIdentsService } from './translating-idents.service';

describe('TranslatingIdentsService', () => {
  let service: TranslatingIdentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingIdentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
