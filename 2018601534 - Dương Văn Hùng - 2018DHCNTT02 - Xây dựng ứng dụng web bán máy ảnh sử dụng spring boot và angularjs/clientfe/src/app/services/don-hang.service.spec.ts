import { TestBed } from '@angular/core/testing';

import { DonHangService } from './don-hang.service';

describe('DonHangService', () => {
  let service: DonHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonHangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
