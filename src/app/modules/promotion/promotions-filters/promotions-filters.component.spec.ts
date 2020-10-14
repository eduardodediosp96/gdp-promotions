import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsFiltersComponent } from './promotions-filters.component';

describe('PromotionsFiltersComponent', () => {
  let component: PromotionsFiltersComponent;
  let fixture: ComponentFixture<PromotionsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
