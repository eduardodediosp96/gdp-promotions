import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTemplateConfirmationComponent } from './promotion-template-confirmation.component';

describe('PromotionTemplateConfirmationComponent', () => {
  let component: PromotionTemplateConfirmationComponent;
  let fixture: ComponentFixture<PromotionTemplateConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionTemplateConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionTemplateConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
