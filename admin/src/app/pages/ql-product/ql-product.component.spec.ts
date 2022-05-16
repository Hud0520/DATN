import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlProductComponent } from './ql-product.component';

describe('QlProductComponent', () => {
  let component: QlProductComponent;
  let fixture: ComponentFixture<QlProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
