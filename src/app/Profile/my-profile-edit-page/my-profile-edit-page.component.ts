import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {ICompleteGeoPosition, IMapLocation, MapsService} from '../../services/maps.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {User} from '../../services/models';

declare let alertify;

@Component({
  selector: 'app-my-profile-edit-page',
  templateUrl: './my-profile-edit-page.component.html',
  styleUrls: ['./my-profile-edit-page.component.sass']
})
export class MyProfileEditPageComponent implements OnInit {

  userData: User;

  ngOnInit(): void {
    this.updateUserProfileInfo();
  }

  constructor(private http: HttpService, private maps: MapsService, private router: Router) {

  }

  /**
   * @description return merged result of Browser location Api and GMap GeoCode
   */
  private async getProfileLocation(): Promise<ICompleteGeoPosition> {
    const coord: IMapLocation = await this.maps.myPosition();
    const cityCountry = await this.maps.getLocationNamyByCoord(coord.lat, coord.lng);
    return ({
      country: cityCountry.country,
      city: cityCountry.city,
      lat: coord.lat,
      lng: coord.lng,
    });
  }

  /**
   * @description set profile info to userData
   */
  private async updateUserProfileInfo(): Promise<void> {
    this.userData = await this.getProfileInfo();
  }

  /**
   * @description return user model for current user
   */
  private getProfileInfo(): Promise<User> {
    return new Promise(resolve => {
      this.http.CurrentUser().subscribe(data => {
        resolve(data.result);
      });
    });
  }

  /**
   * @description Set User Profile imgage and remove old
   * @param file
   */
  private saveNewImg(file: Blob): Promise<void> {
    return new Promise(resolve => {
      if (!file) {
        return resolve();
      }
      const formData: FormData = new FormData();
      formData.append('image', file);
      this.http.deleteUserProfileImg().subscribe(data => {
        this.http.setUserImage(formData).subscribe(dataImg => {
          resolve();
        });
      });
    });
  }

  /**
   * @description set new Lat and Lng for current user
   * @param location
   */
  private saveNewCoord(location: IMapLocation): Promise<void> {
    return new Promise(resolve => {
      this.http.updateUserLocation(location.lat, location.lng).subscribe(data => {
        resolve();
      });
    });
  }

  /**
   * @description rewrite current user profile info by new data
   * @param userData
   */
  private saveNewProfileInfo(userData): Promise<void> {
    return new Promise(resolve => {
      this.http.updateUserProfile(userData).subscribe(data => {
        resolve();
      });
    });
  }

  /**
   * @description navigate to List Page after user data save
   */
  private navigateToListPage(): void {
    this.router.navigateByUrl('/list');
  }

  /**
   * @description changes pipeline for current user profile
   * @param data
   */
  public async saveNewUserData(data): Promise<void> {
    const currentLocation = await this.getProfileLocation();
    const profileInfo = data.data;
    profileInfo.city = currentLocation.city;
    profileInfo.country = currentLocation.country;
    await Promise.all([this.saveNewProfileInfo(profileInfo), this.saveNewImg(data.file), this.saveNewCoord(currentLocation)]);
    alertify.log('Profile updated');
    this.navigateToListPage();
  }

}
