import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {MapsService} from '../../services/maps.service';
import {Router} from '@angular/router';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {interval, Observable, Subject, combineLatest} from 'rxjs';
import {debounce, debounceTime, map, startWith} from 'rxjs/operators';
import {start} from 'repl';

declare var MarkerClusterer;
declare let google;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass']
})
export class MapViewComponent implements OnInit, AfterViewInit {

  @Input('filterAsync') filterAsync;
  map: google.maps.Map;
  coordinates;
  markerClusterer;
  marker;
  mapOptions: google.maps.MapOptions;
  locations = [];
  onMapViewChange = new Subject();
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  constructor(private http: HttpService, private maps: MapsService, private router: Router) {

  };

  ngOnInit() {

    combineLatest(this.filterAsync.pipe(startWith(''), debounce(() => interval(500))),
      this.onMapViewChange.pipe(startWith(true), debounce(() => interval(1000))),
      (word, map) => {
        return {word};
      }
    ).subscribe(async data => {
      const visibleData = this.updateVisible();
      console.log(visibleData);
      let markers = await this.loadMarkers(data.word, visibleData.center.lat, visibleData.center.lng, Math.ceil(visibleData.radius / 1000));
      console.log(markers);
      this.addMarkerts(markers);
    });


  }

  ngAfterViewInit() {
    this.mapInitializer();

  }


  handleClick(data) {
    this.router.navigateByUrl('/profile/' + data.id);
  }


  async mapInitializer() {
    let myPosition = await this.maps.myPosition();
    let coordinates = new google.maps.LatLng(myPosition.lat, myPosition.lng);
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


  updateVisible() {
    let bounds = this.map.getBounds();
    let swPoint = bounds.getSouthWest();
    let nePoint = bounds.getNorthEast();
    let swLat = swPoint.lat();
    let swLng = swPoint.lng();
    let neLat = nePoint.lat();
    let neLng = nePoint.lng();
    let proximitymeter = google.maps.geometry.spherical.computeDistanceBetween(swPoint, nePoint);
    let center = {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()};
    return {
      radius: proximitymeter,
      center
    };
  }

  addMarkerts(markersLoaded) {
    let markers = markersLoaded.map((user) => {
      let location = {lat: +user.lat, lng: +user.lon};
      let marker = new google.maps.Marker({
        position: location,
        map: this.map,
        labelContent: `${user.firstName} ${user.lastName}`,
        labelClass: 'labelPin',
        labelAnchor: new google.maps.Point(0, 100),
        scaledSize: new google.maps.Size(50, 100),
        icon: {
          url: user.image,
          scaledSize: new google.maps.Size(40, 40),
        }
      });
      marker.addListener('click', this.handleClick.bind(this, user));
      return marker;
    });
    if (this.markerClusterer) {
      this.markerClusterer.clearMarkers();
    }
    this.markerClusterer = new MarkerClusterer(this.map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

  }

  async loadMarkers(word, lat, lng, radius) {
    return new Promise((resolve) => {
      this.http.UsersSearch({
        searchString: word,
        radius: radius,
        lat: lat,
        lon: lng,
        perPage: 100,
        page: 0,
      }).subscribe(data => {
        resolve(data.result);
      });
    });
  }


}
