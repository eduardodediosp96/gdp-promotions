import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingCountriesWriteComponent } from './translating-countries-write.component';

describe('TranslatingCountriesWriteComponent', () => {
  let component: TranslatingCountriesWriteComponent;
  let fixture: ComponentFixture<TranslatingCountriesWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingCountriesWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingCountriesWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
