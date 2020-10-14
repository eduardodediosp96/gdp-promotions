import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingCurrenciesListComponent } from './translating-currencies-list.component';

describe('TranslatingCurrenciesListComponent', () => {
  let component: TranslatingCurrenciesListComponent;
  let fixture: ComponentFixture<TranslatingCurrenciesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingCurrenciesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingCurrenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
