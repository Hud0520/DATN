import { TestBed } from '@angular/core/testing';

import { DanhMucService } from './danh-muc.service';

describe('DanhMucService', () => {
  let service: DanhMucService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
