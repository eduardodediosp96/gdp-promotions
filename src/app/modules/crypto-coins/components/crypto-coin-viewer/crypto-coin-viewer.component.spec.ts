import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCoinViewerComponent } from './crypto-coin-viewer.component';

describe('CryptoCoinViewerComponent', () => {
  let component: CryptoCoinViewerComponent;
  let fixture: ComponentFixture<CryptoCoinViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCoinViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCoinViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
