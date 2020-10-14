import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingDocsComponent } from './translating-docs.component';

describe('TranslatingDocsComponent', () => {
  let component: TranslatingDocsComponent;
  let fixture: ComponentFixture<TranslatingDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
