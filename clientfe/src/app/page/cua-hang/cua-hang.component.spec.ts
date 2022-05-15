import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuaHangComponent } from './cua-hang.component';

describe('CuaHangComponent', () => {
  let component: CuaHangComponent;
  let fixture: ComponentFixture<CuaHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuaHangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuaHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
