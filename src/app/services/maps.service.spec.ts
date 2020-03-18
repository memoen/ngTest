import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';


describe('MapsService', () => {
  let service: MapsService;
  let google = window.google;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    });

    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });
});
