import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingKeysComponent } from './translating-keys.component';

describe('TranslatingKeysComponent', () => {
  let component: TranslatingKeysComponent;
  let fixture: ComponentFixture<TranslatingKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
