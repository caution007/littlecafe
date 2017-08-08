/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FrontpageService } from './frontpage.service';

describe('FrontpageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FrontpageService]
    });
  });

  it('should ...', inject([FrontpageService], (service: FrontpageService) => {
    expect(service).toBeTruthy();
  }));
});
