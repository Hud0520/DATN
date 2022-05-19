import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimKiemComponent } from './tim-kiem.component';

describe('TimKiemComponent', () => {
  let component: TimKiemComponent;
  let fixture: ComponentFixture<TimKiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimKiemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimKiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
