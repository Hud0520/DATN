import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonHangComponent } from './don-hang.component';

describe('DonHangComponent', () => {
  let component: DonHangComponent;
  let fixture: ComponentFixture<DonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonHangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
