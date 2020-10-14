import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocWriteComponent } from './doc-write.component';

describe('DocWriteComponent', () => {
  let component: DocWriteComponent;
  let fixture: ComponentFixture<DocWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
