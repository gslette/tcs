import { Component, OnInit } from '@angular/core';
import { Direction } from 'src/app/models/direction.model';
import { Route } from 'src/app/models/route.model';
import { Stop } from 'src/app/models/stop.model';
import { NextTripService } from 'src/app/services/next-trip.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public routes: Route[];
  public directions: Direction[];
  public stops: Stop[];

  public selectedRoute: number;
  public selectedDirection: number;

  public columnsToDisplay = ['stopCode', 'description'];

  constructor(private nextTripService: NextTripService) { }

  ngOnInit(): void {
    this.loadRoutes();
  }

  private loadRoutes(){
    this.nextTripService.getRoutes().subscribe(data => {
      this.routes = data;
    })
  }

  public onRouteSelect(event: any){
    this.selectedRoute = event.source.value;
    this.nextTripService.getDirections(this.selectedRoute).subscribe(data => {
      this.directions = data;
    })
  }

  public onDirectionSelect(event: any){
    this.selectedDirection = event.source.value;
    console.log(event);
    this.nextTripService.getStops(this.selectedRoute, this.selectedDirection).subscribe(data => {
      this.stops = data;
    })
  }
}
