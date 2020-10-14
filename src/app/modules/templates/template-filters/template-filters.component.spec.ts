import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesFiltersComponent } from './template-filters.component';

describe('TemplatesFiltersComponent', () => {
  let component: TemplatesFiltersComponent;
  let fixture: ComponentFixture<TemplatesFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
