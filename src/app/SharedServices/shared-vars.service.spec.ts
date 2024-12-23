import { TestBed } from '@angular/core/testing';

import { SharedVarsService } from './shared-vars.service';

describe('SharedVarsService', () => {
  let service: SharedVarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedVarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
