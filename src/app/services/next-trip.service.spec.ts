import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';

import { NextTripService } from './next-trip.service';
import { Route } from '../models/route.model';
import { Direction } from '../models/direction.model';
import { Stop } from '../models/stop.model';

describe('NextTripService', () => {
  let service: NextTripService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let url = 'https://svc.metrotransit.org/nextripv2/';
  let routes: Route[] = Object({ routes: [ Object({ route_id: 901, agency_id: 0, route_label: 'METRO Blue Line' }), Object({ route_id: 902, agency_id: 0, route_label: 'METRO Green Line' }) ] });
  let directions: Direction[] = [{direction_id: 0, direction_name: 'Northbound'}, {direction_id: 1, direction_name: 'Southbound'}];
  let stops: Stop[] = [{place_code: 'MAAM', description: 'Mall of America Station'},{place_code: '28AV', description: '28th Ave Station'}]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(NextTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all routes', function() {
    let acutalRoutes: Route[] | undefined;

    const routes$ = service.getRoutes();
    routes$.subscribe(result => {
      acutalRoutes = result;
    });

    const req = httpTestingController.expectOne(url + 'routes');
    req.flush(routes);

    expect(acutalRoutes).toEqual(routes);
  });

  it('should get directions based on a route id', function() {
    let actualDirections: Direction[] | undefined;

    const directions$ = service.getDirections(901);
    directions$.subscribe(result => {
      actualDirections = result;
    });

    const req = httpTestingController.expectOne(url + 'directions/' + '901');
    req.flush(directions);

    expect(actualDirections).toEqual(directions);
  });

  it('should get stops based on a route id and direction id', function() {
    let actualStops: Stop[] | undefined;

    const stops$ = service.getStops(901, 0);
    stops$.subscribe(result => {
      actualStops = result;
    });

    const req = httpTestingController.expectOne(url + 'stops/' + '901/' + '0');
    req.flush(stops);

    expect(actualStops).toEqual(stops);
  });
});
