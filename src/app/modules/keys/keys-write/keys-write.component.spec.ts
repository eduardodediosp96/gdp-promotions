import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysWriteComponent } from './keys-write.component';

describe('KeysWriteComponent', () => {
  let component: KeysWriteComponent;
  let fixture: ComponentFixture<KeysWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
