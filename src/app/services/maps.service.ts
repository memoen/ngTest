import {Injectable} from '@angular/core';

declare let google;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;

  constructor() {
  }

  myPosition() {
    return new Promise((resolve, reject) => {
      let onOk = (position) => {
        let lat: number = position.coords.latitude;
        let lng: number = position.coords.longitude;
        resolve({
          lat: lat,
          lng: lng,
        });
      };
      let onerror = () => {
        reject();
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onOk, onerror);
      }

    });
  }


  getLocationNamyByCoord(lat, lng) {
    return new Promise((resolve, reject) => {

      let latlng = new google.maps.LatLng(lat, lng);
      this.geocoder.geocode({location: latlng}, function(results, status) {
        let city = results[0].address_components[4].short_name;
        let country = results[0].address_components[5].short_name;
        /// test offline

        resolve({country, city});
      });
    });
  }
}
