import { TestBed } from '@angular/core/testing';

import { GioHangService } from './gio-hang.service';

describe('GioHangService', () => {
  let service: GioHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GioHangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
