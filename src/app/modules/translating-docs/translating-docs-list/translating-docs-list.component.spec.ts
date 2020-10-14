import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingDocsListComponent } from './translating-docs-list.component';

describe('TranslatingDocsListComponent', () => {
  let component: TranslatingDocsListComponent;
  let fixture: ComponentFixture<TranslatingDocsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingDocsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingDocsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
