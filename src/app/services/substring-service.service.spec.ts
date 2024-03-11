import { TestBed } from '@angular/core/testing';

import { SubstringServiceService } from './substring-service.service';

describe('SubstringServiceService', () => {
  let service: SubstringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubstringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
