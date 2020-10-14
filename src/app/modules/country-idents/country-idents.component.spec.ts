import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryIdentsComponent } from './country-idents.component';

describe('CountryIdentsComponent', () => {
  let component: CountryIdentsComponent;
  let fixture: ComponentFixture<CountryIdentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryIdentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryIdentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
