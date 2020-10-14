import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingCurrenciesWriteComponent } from './translating-currencies-write.component';

describe('TranslatingCurrenciesWriteComponent', () => {
  let component: TranslatingCurrenciesWriteComponent;
  let fixture: ComponentFixture<TranslatingCurrenciesWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingCurrenciesWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingCurrenciesWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
