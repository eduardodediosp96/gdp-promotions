import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentsComponent } from './idents.component';

describe('IdentsComponent', () => {
  let component: IdentsComponent;
  let fixture: ComponentFixture<IdentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
