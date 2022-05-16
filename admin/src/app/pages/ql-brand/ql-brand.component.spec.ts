import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlBrandComponent } from './ql-brand.component';

describe('QlBrandComponent', () => {
  let component: QlBrandComponent;
  let fixture: ComponentFixture<QlBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
