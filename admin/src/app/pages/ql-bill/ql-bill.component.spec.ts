import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlBillComponent } from './ql-bill.component';

describe('QlBillComponent', () => {
  let component: QlBillComponent;
  let fixture: ComponentFixture<QlBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
