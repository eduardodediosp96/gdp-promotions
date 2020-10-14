import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingCountriesComponent } from './translating-countries.component';

describe('TranslatingCountriesComponent', () => {
  let component: TranslatingCountriesComponent;
  let fixture: ComponentFixture<TranslatingCountriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingCountriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
