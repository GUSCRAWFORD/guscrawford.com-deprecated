import { TestBed, inject } from '@angular/core/testing';

import { ODataService } from './odata.service';

describe('ODataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ODataService]
    });
  });

  it('should be created', inject([ODataService], (service: ODataService) => {
    expect(service).toBeTruthy();
  }));
});
