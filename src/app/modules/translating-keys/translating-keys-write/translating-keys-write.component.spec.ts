import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingKeysWriteComponent } from './translating-keys-write.component';

describe('TranslatingKeysWriteComponent', () => {
  let component: TranslatingKeysWriteComponent;
  let fixture: ComponentFixture<TranslatingKeysWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingKeysWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingKeysWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
