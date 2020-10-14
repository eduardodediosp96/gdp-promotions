import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingCodesComponent } from './calling-codes.component';

describe('CallingCodesComponent', () => {
  let component: CallingCodesComponent;
  let fixture: ComponentFixture<CallingCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
