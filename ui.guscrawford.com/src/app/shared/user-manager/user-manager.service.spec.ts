import { TestBed, inject } from '@angular/core/testing';

import { UserManager } from './user-manager.service';

describe('ODataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManager]
    });
  });

  it('should be created', inject([UserManager], (service: UserManager) => {
    expect(service).toBeTruthy();
  }));
});
