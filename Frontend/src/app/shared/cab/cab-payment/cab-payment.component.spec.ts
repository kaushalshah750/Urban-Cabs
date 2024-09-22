import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabPaymentComponent } from './cab-payment.component';

describe('CabPaymentComponent', () => {
  let component: CabPaymentComponent;
  let fixture: ComponentFixture<CabPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
