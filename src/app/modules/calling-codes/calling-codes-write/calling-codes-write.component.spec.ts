import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallingCodesWriteComponent } from './calling-codes-write.component';

describe('CallingCodesWriteComponent', () => {
  let component: CallingCodesWriteComponent;
  let fixture: ComponentFixture<CallingCodesWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallingCodesWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallingCodesWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
