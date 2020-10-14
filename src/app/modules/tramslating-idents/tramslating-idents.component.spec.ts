import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TramslatingIdentsComponent } from './tramslating-idents.component';

describe('TramslatingIdentsComponent', () => {
  let component: TramslatingIdentsComponent;
  let fixture: ComponentFixture<TramslatingIdentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TramslatingIdentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TramslatingIdentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
