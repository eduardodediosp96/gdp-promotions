import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingCurrenciesComponent } from './translating-currencies.component';

describe('TranslatingCurrenciesComponent', () => {
  let component: TranslatingCurrenciesComponent;
  let fixture: ComponentFixture<TranslatingCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
