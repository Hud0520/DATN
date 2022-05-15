import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatHangComponent } from './dat-hang.component';

describe('DatHangComponent', () => {
  let component: DatHangComponent;
  let fixture: ComponentFixture<DatHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatHangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
