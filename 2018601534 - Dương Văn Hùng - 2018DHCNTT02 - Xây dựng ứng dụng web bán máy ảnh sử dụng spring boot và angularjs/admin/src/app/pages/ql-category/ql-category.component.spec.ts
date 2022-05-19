import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlCategoryComponent } from './ql-category.component';

describe('QlCategoryComponent', () => {
  let component: QlCategoryComponent;
  let fixture: ComponentFixture<QlCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
