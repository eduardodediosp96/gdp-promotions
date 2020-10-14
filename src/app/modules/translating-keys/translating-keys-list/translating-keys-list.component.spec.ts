import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingKeysListComponent } from './translating-keys-list.component';

describe('TranslatingKeysListComponent', () => {
  let component: TranslatingKeysListComponent;
  let fixture: ComponentFixture<TranslatingKeysListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingKeysListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingKeysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
