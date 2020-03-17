import {Injectable} from '@angular/core';

declare let google;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  geocoder: any = new google.maps.Geocoder();
  map: google.maps.Map;

  constructor() {
  }

  /**
   * @description GMap Distance Api Call, return visible radius from center ( depends on zoom) and center
   */
  public updateVisible(bounds, mapCenter) {
    const swPoint = bounds.getSouthWest();
    const nePoint = bounds.getNorthEast();
    const visibleMeter = google.maps.geometry.spherical.computeDistanceBetween(swPoint, nePoint);
    const center = {lat: mapCenter.lat(), lng: mapCenter.lng()};
    return {
      radius: visibleMeter,
      center
    };
  }


  /**
   * @description Browser Api call, return current location
   */
  public myPosition(): Promise<IMapLocation> {
    return new Promise((resolve, reject) => {
      const onOk = (position) => {
        const lat: number = position.coords.latitude;
        const lng: number = position.coords.longitude;
        resolve({lat, lng});
      };
      const onerror = () => {
        reject();
      };
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onOk, onerror);
      }
    });
  }


  /**
   * @description Google GeoCode API call, return country and city for current lng and lat
   * @param lat
   * @param lng
   */
  public getLocationNamyByCoord(lat: number, lng: number): Promise<IGeoCodeResult> {
    return new Promise((resolve, reject) => {
      const latlng = new google.maps.LatLng(lat, lng);
      this.geocoder.geocode({location: latlng}, (results, status) => {
        const city = results[0].address_components[4].short_name;
        const country = results[0].address_components[5].short_name;
        resolve({country, city});
      });
    });
  }
}

export interface IGeoCodeResult {
  city: string,
  country: string,
}

export interface IMapLocation {
  lat: number,
  lng: number,
}

export interface ICompleteGeoPosition extends IGeoCodeResult, IMapLocation {
}
