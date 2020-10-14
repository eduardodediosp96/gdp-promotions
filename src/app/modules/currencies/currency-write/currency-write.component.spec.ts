import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyWriteComponent } from './currency-write.component';

describe('CurrencyWriteComponent', () => {
  let component: CurrencyWriteComponent;
  let fixture: ComponentFixture<CurrencyWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
