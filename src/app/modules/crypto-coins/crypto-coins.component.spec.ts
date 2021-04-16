import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCoinsComponent } from './crypto-coins.component';

describe('CryptoCoinsComponent', () => {
  let component: CryptoCoinsComponent;
  let fixture: ComponentFixture<CryptoCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
