import { TestBed } from '@angular/core/testing';

import { AdverService } from './adver.service';

describe('AdverService', () => {
  let service: AdverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
