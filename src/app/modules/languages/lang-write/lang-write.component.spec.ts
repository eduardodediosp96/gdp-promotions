import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangWriteComponent } from './lang-write.component';

describe('LangWriteComponent', () => {
  let component: LangWriteComponent;
  let fixture: ComponentFixture<LangWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
