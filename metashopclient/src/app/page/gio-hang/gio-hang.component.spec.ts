import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GioHangComponent } from './gio-hang.component';

describe('GioHangComponent', () => {
  let component: GioHangComponent;
  let fixture: ComponentFixture<GioHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GioHangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GioHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
