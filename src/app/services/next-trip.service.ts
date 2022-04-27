import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Route } from '../models/route.model';
import { Direction } from '../models/direction.model';
import { Stop } from '../models/stop.model';

@Injectable({
  providedIn: 'root'
})
export class NextTripService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://svc.metrotransit.org/nextripv2/';
  }

  getRoutes(){
    return this.http.get<Route[]>(this.url + 'routes');
  }

  getDirections(routeId: number){
    return this.http.get<Direction[]>(this.url + 'directions/' + `${routeId}`)
  }

  getStops(routeId: number, directionId: number){
    return this.http.get<Stop[]>(this.url + 'stops/' + `${routeId}/` + `${directionId}`)
  }
}
