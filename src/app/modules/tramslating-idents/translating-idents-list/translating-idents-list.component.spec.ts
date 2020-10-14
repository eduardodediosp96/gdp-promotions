import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslatingIdentsListComponent } from './translating-idents-list.component';

describe('TranslatingIdentsListComponent', () => {
  let component: TranslatingIdentsListComponent;
  let fixture: ComponentFixture<TranslatingIdentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslatingIdentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatingIdentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
