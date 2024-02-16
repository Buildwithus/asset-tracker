import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { empguardGuard } from './empguard.guard';

describe('empguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => empguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
