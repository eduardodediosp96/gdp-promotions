import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingIdentsWriteComponent } from './translating-idents-write.component';

describe('TranslatingIdentsWriteComponent', () => {
  let component: TranslatingIdentsWriteComponent;
  let fixture: ComponentFixture<TranslatingIdentsWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingIdentsWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingIdentsWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
