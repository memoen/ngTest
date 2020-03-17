import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CredentialService} from './credential.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiBasePath = 'https://test-api.live.gbksoft.net/rest';

  public requestGet(urlPath: string, json): Observable<any> {
    return this.httpClient.get(this.apiBasePath + urlPath, {params: json});
  }

  public requestGetAuth(urlPath: string, json): Observable<any> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.credential.Token);
    return this.httpClient.get(this.apiBasePath + urlPath, {params: json, headers: header});
  }

  public requestPost(urlPart: string, json) {
    return this.httpClient.post(this.apiBasePath + urlPart, json);
  }

  public requestPostAuth(urlPart: string, json): Observable<any> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.credential.Token);
    return this.httpClient.post(this.apiBasePath + urlPart, json, {headers: header});
  }

  public requestDeleteAuth(urlPart: string): Observable<any> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.credential.Token);
    return this.httpClient.delete(this.apiBasePath + urlPart, {headers: header});
  }

  public requestPutAuth(urlPart: string, json): Observable<any> {
    const header = new HttpHeaders().set('Authorization', 'Bearer ' + this.credential.Token);
    return this.httpClient.put(this.apiBasePath + urlPart, json, {headers: header});
  }

  constructor(private httpClient: HttpClient, private credential: CredentialService) {
  }

  public login(email: string, password: string) {
    return this.requestPost('/v1/user/login', {
      email: email,
      password: password,
    });
  }

  public register(email: string, password: string) {
    return this.requestPost('/v1/user/register', {
      email: email,
      password: password,
    });
  }

  public loginType(token: string) {
    let type: string = 'facebook';
    return this.requestGet('/v1/user/login/' + type, {token});
  }

  /// user

  public CurrentUser() {

    // Bearer
    return this.requestGetAuth('/v1/user/current', {});
  }

  public UserById(id) {
    return this.requestGetAuth('/v1/user/' + id, {});
  }

  /**
   * @description all users in system
   *
   */
  public Users(perPage, pageIndex) {
    return this.requestGetAuth('/v1/user', {perPage, page: pageIndex});
  }

//{searchString, radius, lat, lon, perPage, page}
  public UsersSearch(filterObj) {
    return this.requestGetAuth('/v1/user/search', filterObj);
  }

  public updateUserProfile(userData) {
    return this.requestPutAuth('/v1/user/profile', userData);
  }

  public updateUserLocation(lat, lon) {
    return this.requestPutAuth('/v1/user/location', {lat, lon});

  }

  public setUserImage(formData) {
    return this.requestPostAuth('/v1/user/profile/image', formData);
  }

  public deleteUserProfileImg() {
    return this.requestDeleteAuth('/v1/user/profile/image');
  }

  public logOut() {

  }


}
