import { TestBed } from '@angular/core/testing';

import { UserLoginAuthService } from './user-login-auth.service';

describe('UserLoginAuthService', () => {
  let service: UserLoginAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoginAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
