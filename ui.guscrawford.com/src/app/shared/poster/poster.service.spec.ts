import { TestBed, inject } from '@angular/core/testing';

import { Poster } from './poster.service';

describe('PosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Poster]
    });
  });

  it('should be created', inject([Poster], (service: Poster) => {
    expect(service).toBeTruthy();
  }));
});
