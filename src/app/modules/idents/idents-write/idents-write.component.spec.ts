import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentsWriteComponent } from './idents-write.component';

describe('IdentsWriteComponent', () => {
  let component: IdentsWriteComponent;
  let fixture: ComponentFixture<IdentsWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentsWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentsWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
