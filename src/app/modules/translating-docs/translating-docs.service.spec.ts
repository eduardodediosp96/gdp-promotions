import { TestBed } from '@angular/core/testing';

import { TranslatingDocsService } from './translating-docs.service';

describe('TranslatingDocsService', () => {
  let service: TranslatingDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
