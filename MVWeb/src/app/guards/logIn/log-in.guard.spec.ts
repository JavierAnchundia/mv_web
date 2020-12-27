import { TestBed } from '@angular/core/testing';

import { LogInGuard } from './log-in.guard';

describe('LogInGuard', () => {
  let guard: LogInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
