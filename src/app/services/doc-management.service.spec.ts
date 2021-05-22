import { TestBed } from '@angular/core/testing';

import { DocManagementService } from './doc-management.service';

describe('DocManagementService', () => {
  let service: DocManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
