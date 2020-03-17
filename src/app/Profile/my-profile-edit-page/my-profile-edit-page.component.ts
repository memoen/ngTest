import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../services/http.service';
import {MapsService} from '../../services/maps.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Router} from '@angular/router';

declare let alertify;

@Component({
  selector: 'app-my-profile-edit-page',
  templateUrl: './my-profile-edit-page.component.html',
  styleUrls: ['./my-profile-edit-page.component.sass']
})
export class MyProfileEditPageComponent implements OnInit {

  userData;

  ngOnInit(): void {
    this.updateUserProfileInfo();
  }

  constructor(private http: HttpService, private maps: MapsService, private router: Router) {

  }


  async getProfileLocation() {
    let coord = await this.maps.myPosition();
    let cityCountry = await this.maps.getLocationNamyByCoord(coord.lat, coord.lng);
    return ({
      country: cityCountry.country,
      city: cityCountry.city,
      lat: coord.lat,
      lng: coord.lng,
    });

  }


  async updateUserProfileInfo() {
    this.userData = await this.getProfileInfo();
  }

  getProfileInfo() {
    return new Promise(resolve => {
      this.http.CurrentUser().subscribe(data => {
        resolve(data.result);
      });
    });
  }


  saveNewImg(file) {
    return new Promise(resolve => {
      if (!file) {
        return resolve();
      }
      let formData = new FormData();
      formData.append('image', file);
      this.http.deleteUserProfileImg().subscribe(data => {
        this.http.setUserImage(formData).subscribe(dataImg => {
          resolve();
        });
      });
    });

  }

  saveNewCoord(location) {
    return new Promise(resolve => {
      this.http.updateUserLocation(location.lat, location.lng).subscribe(data => {
        resolve();
      });
    });
  }

  saveNewProfileInfo(userData) {
    return new Promise(resolve => {
      this.http.updateUserProfile(userData).subscribe(data => {
        resolve();
      });
    });
  }

  async saveNewUserData(data) {
    const currentLocation = await this.getProfileLocation();
    const profileInfo = data.data;
    profileInfo.city = currentLocation.city;
    profileInfo.country = currentLocation.country;
    await Promise.all([this.saveNewProfileInfo(profileInfo), this.saveNewImg(data.file), this.saveNewCoord(currentLocation)]);
    alertify.log('Profile updated');

    this.router.navigateByUrl('/list');
  }
}
