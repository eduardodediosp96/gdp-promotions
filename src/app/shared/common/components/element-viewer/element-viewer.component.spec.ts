import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementViewerComponent } from './element-viewer.component';

describe('ElementViewerComponent', () => {
  let component: ElementViewerComponent;
  let fixture: ComponentFixture<ElementViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
