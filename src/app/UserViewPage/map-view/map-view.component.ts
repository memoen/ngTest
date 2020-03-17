import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {MapsService} from '../../services/maps.service';
import {Router} from '@angular/router';
import {interval, Observable, Subject, combineLatest} from 'rxjs';
import {debounce, debounceTime, map, startWith} from 'rxjs/operators';
import {User} from '../../services/models';


declare let MarkerClusterer;
declare let alertify;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass']
})
export class MapViewComponent implements OnInit, AfterViewInit {

  map: google.maps.Map;
  mapOptions: google.maps.MapOptions;
  markerClusterer;
  onMapViewChange: Subject<boolean> = new Subject();

  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @Input('filterAsync') filterAsync;

  constructor(private http: HttpService, private maps: MapsService, private router: Router) {
  };


  /**
   * @description handle input[firstName] or map[move, resive], then update all markers on map
   */
  private handleFiltersChange(): void {
    combineLatest(
      this.filterAsync.pipe(debounce(() => interval(500)), startWith('')),
      this.onMapViewChange.pipe(debounce(() => interval(1000)), startWith(true)),
      (word) => {
        return word;
      }
    ).subscribe(async (filterWord: string) => {
      if (!this.map) {
        return;
      }
      const center = this.map.getCenter();
      const bounds = this.map.getBounds();

      const visibleData = this.maps.updateVisible(bounds, center);
      const markers = await this.loadMarkers(filterWord, visibleData.center.lat, visibleData.center.lng, Math.ceil(visibleData.radius / 1000 / 2));
      this.addMarkerts(markers);
    });
  }

  /**
   * @description handle click on map Icon
   * @param data
   */
  private handleClick(data): void {
    this.router.navigateByUrl('/profile/' + data.id);
  }

  /**
   * @description Init GMap params, add [bounds_changed] event Listener
   */
  private async mapInitializer(): Promise<void> {
    const myPosition = await this.maps.myPosition();
    const coordinates = new google.maps.LatLng(myPosition.lat, myPosition.lng);
    this.mapOptions = {
      center: coordinates,
      zoom: 15,
    };
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

    this.map.addListener('bounds_changed', async () => {
      this.onMapViewChange.next(true);
    });
  }


  /**
   * @description add markers in visible zone and clear all out of visible zone
   * @param markersLoaded
   */
  private addMarkerts(markersLoaded): void {
    const markers = markersLoaded.map((user) => {
      return this.buildMarker(user);
    });
    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }

    this.markerClusterer = new MarkerClusterer(this.map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

  /**
   * @description convert User to Marker and subscribe to Click
   * @param user
   */
  private buildMarker(user) {
    const location = {lat: +user.lat, lng: +user.lon};
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: `${user.firstName} ${user.lastName}`,
      icon: {
        url: user.image,
        scaledSize: new google.maps.Size(40, 40),
      }
    });
    marker.addListener('click', this.handleClick.bind(this, user));
    return marker;
  }


  /**
   * @description load all visible markers
   * @param word
   * @param lat
   * @param lng
   * @param radius
   */
  private async loadMarkers(word: string, lat: number, lng: number, radius: number): Promise<User[]> {
    return new Promise((resolve) => {
      this.http.UsersSearch({
        searchString: word,
        lon: lng,
        page: 0,
        perPage: 100,
        radius,
        lat,
      }).subscribe(data => {
        resolve(data.result);
      });
    });
  }


  ngAfterViewInit() {
    Promise.all([this.mapInitializer(), this.handleFiltersChange()]).then(done => {

    }, () => {
      alertify.log('Failed to load Map');
    });
  }

  ngOnInit() {
  }

}
