import { TestBed } from '@angular/core/testing';

import { PhaseActionService } from './phase-action.service';

describe('PhaseActionService', () => {
  let service: PhaseActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhaseActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
