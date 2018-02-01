import { TestBed, inject } from '@angular/core/testing';

import { OdataService } from './odata.service';

describe('OdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdataService]
    });
  });

  it('should be created', inject([OdataService], (service: OdataService) => {
    expect(service).toBeTruthy();
  }));
});
