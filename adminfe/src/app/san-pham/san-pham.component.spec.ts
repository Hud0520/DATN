import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamComponent } from './san-pham.component';

describe('SanPhamComponent', () => {
  let component: SanPhamComponent;
  let fixture: ComponentFixture<SanPhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanPhamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
