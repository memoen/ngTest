import { TestBed } from '@angular/core/testing';

import { LocationUpdaterService } from './location-updater.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('LocationUpdaterService', () => {
  let service: LocationUpdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LocationUpdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
