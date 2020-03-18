import {Injectable} from '@angular/core';
import {IMapLocation, MapsService} from './maps.service';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationUpdaterService {

  /**
   * @description current checkInterval 1m
   */
  private timeCheckInterval = 1000 * 60;
  private lastPositionValue: IMapLocation = {lat: 0, lng: 0};

  constructor(private maps: MapsService,
              private http: HttpService
  ) {
    this.locationChangeScheduler();
  }

  /**
   * @description check is location changed every {timeCheckInterval} second
   */
  private locationChangeScheduler() {
    setInterval(() => {
      this.checkIsChanged();
    }, this.timeCheckInterval);
  }

  /**
   * @description compare previous and current location. If location chaned, then update current profile location
   */
  private async checkIsChanged() {
    const currentPositon = await this.maps.myPosition();
    const previousLocation = this.lastPositionValue;
    const distance = this.maps.getDistanceBetweenPointsIMapLocation(currentPositon, previousLocation);
    if (distance > 1000) {
      this.http.updateUserLocation(currentPositon.lat, currentPositon.lng).subscribe(data => {
        this.lastPositionValue = currentPositon;
      });
    }
  }
}




