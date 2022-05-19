import { TestBed } from '@angular/core/testing';

import { ThuongHieuService } from './thuong-hieu.service';

describe('ThuongHieuService', () => {
  let service: ThuongHieuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThuongHieuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
