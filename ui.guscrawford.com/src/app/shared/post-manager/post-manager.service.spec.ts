import { TestBed, inject } from '@angular/core/testing';

import { PostManager } from './post-manager.service';

describe('PostManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostManager]
    });
  });

  it('should be created', inject([PostManager], (service: PostManager) => {
    expect(service).toBeTruthy();
  }));
});
