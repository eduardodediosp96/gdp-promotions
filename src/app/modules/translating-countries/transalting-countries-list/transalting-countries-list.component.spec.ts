import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaltingCountriesListComponent } from './transalting-countries-list.component';

describe('TransaltingCountriesListComponent', () => {
  let component: TransaltingCountriesListComponent;
  let fixture: ComponentFixture<TransaltingCountriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaltingCountriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaltingCountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
