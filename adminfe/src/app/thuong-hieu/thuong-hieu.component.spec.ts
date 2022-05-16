import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuongHieuComponent } from './thuong-hieu.component';

describe('ThuongHieuComponent', () => {
  let component: ThuongHieuComponent;
  let fixture: ComponentFixture<ThuongHieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThuongHieuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuongHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
