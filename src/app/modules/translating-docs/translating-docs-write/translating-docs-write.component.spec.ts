import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingDocsWriteComponent } from './translating-docs-write.component';

describe('TranslatingDocsWriteComponent', () => {
  let component: TranslatingDocsWriteComponent;
  let fixture: ComponentFixture<TranslatingDocsWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingDocsWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingDocsWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
