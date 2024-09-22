import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCabPaymentComponent } from './add-cab-payment.component';

describe('AddCabPaymentComponent', () => {
  let component: AddCabPaymentComponent;
  let fixture: ComponentFixture<AddCabPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCabPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCabPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
